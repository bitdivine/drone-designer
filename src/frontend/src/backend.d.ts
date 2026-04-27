import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Part {
    id: string;
    weight: number;
    owner: Principal;
    name: string;
    createdAt: bigint;
    isSample: boolean;
    specs: string;
    imageUrl?: string;
    category: PartCategory;
}
export interface PartInput {
    id: string;
    weight: number;
    name: string;
    specs: string;
    imageUrl?: string;
    category: PartCategory;
}
export interface DroneDesign {
    name: string;
    timestamp: bigint;
    designData: string;
}
export interface UserProfile {
    name: string;
}
export enum PartCategory {
    propeller = "propeller",
    frame = "frame",
    motor = "motor",
    flightController = "flightController",
    camera = "camera",
    battery = "battery"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteDesign(name: string): Promise<void>;
    deletePart(id: string): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDesign(name: string): Promise<DroneDesign | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listDesigns(): Promise<Array<DroneDesign>>;
    listParts(): Promise<Array<Part>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveDesign(name: string, designData: string): Promise<void>;
    savePart(input: PartInput): Promise<string>;
}
