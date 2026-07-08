import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, defer, Observable, tap, throwError } from 'rxjs';
import { ClientCacheService } from './client-cache.service';

export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    tierRequired: string;
    lessonCount: number;
    completedCount: number;
}

export interface Lesson {
    id: string;
    courseId: string;
    courseSlug?: string;
    courseTitle?: string;
    title: string;
    slug: string;
    content: string;
    didYouKnow: string;
    tryThisToday: string;
    orderIndex: number;
    durationMinutes: number;
    isCompleted?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class LearningHubService {
    private apiUrl = `${environment.apiUrl}/courses`;
    private readonly coursesCacheKey = 'courses.list';
    private readonly courseDetailCachePrefix = 'courses.detail';
    private readonly lessonCachePrefix = 'courses.lesson';
    private readonly cacheTtlMs = 30 * 60 * 1000;

    courses = signal<Course[]>([]);
    currentCourse = signal<any>(null);
    currentLesson = signal<Lesson | null>(null);

    constructor(
        private http: HttpClient,
        private cache: ClientCacheService
    ) { }

    fetchCourses() {
        const cached = this.cache.get<Course[]>(this.coursesCacheKey);
        if (cached?.data) {
            this.courses.set(cached.data);
        }

        this.http.get<Course[]>(this.apiUrl).subscribe(data => {
            const courses = this.normalizeArray<Course>(data);
            this.setCourses(courses);
            this.prefetchFirstCourseDetails(courses);
        });
    }

    getCourseDetails(slug: string) {
        const cacheKey = this.courseDetailCacheKey(slug);
        const cached = this.cache.get<any>(cacheKey);
        if (cached?.data) {
            this.currentCourse.set(cached.data);
        }

        this.http.get<any>(`${this.apiUrl}/${slug}`).subscribe(data => {
            const course = this.unwrapData(data);
            this.setCurrentCourse(course);
        });
    }

    getLesson(slug: string) {
        const cacheKey = `${this.lessonCachePrefix}.${slug}`;
        const cached = this.cache.get<Lesson>(cacheKey);
        if (cached?.data) {
            this.currentLesson.set(cached.data);
        }

        this.http.get<Lesson>(`${this.apiUrl}/lessons/${slug}`).subscribe(data => {
            const lesson = this.unwrapData(data);
            this.currentLesson.set(lesson);
            this.cache.set(cacheKey, lesson, this.cacheTtlMs);
        });
    }

    completeLesson(lessonId: string, score?: number): Observable<any> {
        return defer(() => {
            const previousLesson = this.currentLesson();
            const previousCourse = this.currentCourse();
            const previousCourses = this.courses();
            const wasCompleted = previousLesson?.isCompleted === true;

            if (previousLesson?.id === lessonId) {
                this.currentLesson.set({ ...previousLesson, isCompleted: true });
                this.cache.set(`${this.lessonCachePrefix}.${previousLesson.slug}`, { ...previousLesson, isCompleted: true }, this.cacheTtlMs);
            }

            if (previousCourse?.lessons) {
                this.setCurrentCourse({
                    ...previousCourse,
                    lessons: previousCourse.lessons.map((lesson: Lesson) =>
                        lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
                    )
                });
            }

            if (!wasCompleted) {
                const courseId = previousLesson?.courseId || previousCourse?.id;
                this.setCourses(previousCourses.map(course =>
                    course.id === courseId
                        ? { ...course, completedCount: Math.min(course.lessonCount, course.completedCount + 1) }
                        : course
                ));
            }

            return this.http.post(`${this.apiUrl}/lessons/${lessonId}/complete`, score ?? null).pipe(
                tap(() => {
                    if (this.currentCourse()) {
                        this.getCourseDetails(this.currentCourse().slug);
                    }
                    this.fetchCourses();
                }),
                catchError(error => {
                    this.currentLesson.set(previousLesson);
                    if (previousLesson?.slug) {
                        this.cache.set(`${this.lessonCachePrefix}.${previousLesson.slug}`, previousLesson, this.cacheTtlMs);
                    }
                    this.setCurrentCourse(previousCourse);
                    this.setCourses(previousCourses);
                    return throwError(() => error);
                })
            );
        });
    }

    private setCourses(courses: Course[]): void {
        this.courses.set(courses);
        this.cache.set(this.coursesCacheKey, courses, this.cacheTtlMs);
    }

    private setCurrentCourse(course: any): void {
        this.currentCourse.set(course);
        if (course?.slug) {
            this.cache.set(this.courseDetailCacheKey(course.slug), course, this.cacheTtlMs);
        }
    }

    private courseDetailCacheKey(slug: string): string {
        return `${this.courseDetailCachePrefix}.${slug}`;
    }

    private normalizeArray<T>(data: any): T[] {
        const unwrapped = this.unwrapData(data);
        return Array.isArray(unwrapped) ? unwrapped : [];
    }

    private unwrapData<T = any>(data: any): T {
        return data?.data ?? data;
    }

    private prefetchFirstCourseDetails(courses: Course[]): void {
        const firstCourse = courses[0];
        if (!firstCourse?.slug || this.cache.getFresh<any>(this.courseDetailCacheKey(firstCourse.slug))) {
            return;
        }

        this.http.get<any>(`${this.apiUrl}/${firstCourse.slug}`).subscribe({
            next: data => {
                const course = this.unwrapData(data);
                if (course?.slug) {
                    this.cache.set(this.courseDetailCacheKey(course.slug), course, this.cacheTtlMs);
                }
            },
            error: () => undefined
        });
    }
}
