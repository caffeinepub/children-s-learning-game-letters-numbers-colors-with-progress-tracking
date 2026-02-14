import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Question {
    answers: Array<string>;
    category: Category;
    prompt: string;
}
export interface Progress {
    lastPlayed: bigint;
    roundsPlayed: bigint;
    highestScore: bigint;
}
export enum Category {
    letters = "letters",
    numbers = "numbers",
    colors = "colors"
}
export interface backendInterface {
    getProgress(): Promise<Progress>;
    getQuestionsByCategory(category: Category): Promise<Array<Question>>;
    updateProgress(category: Category, score: bigint): Promise<void>;
}
