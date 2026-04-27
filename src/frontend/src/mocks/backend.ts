import type { backendInterface } from "../backend";
import { PartCategory, UserRole } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

// A tiny 1x1 transparent PNG as a data URL — lightweight stand-in for a real image
const SAMPLE_IMAGE_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,

  assignCallerUserRole: async (_user: Principal, _role: UserRole) => undefined,

  deleteDesign: async (_name: string) => undefined,

  deletePart: async (_id: string) => true,

  getCallerUserProfile: async () => null,

  getCallerUserRole: async () => UserRole.guest,

  getDesign: async (_name: string) => null,

  getUserProfile: async (_user: Principal) => null,

  isCallerAdmin: async () => false,

  listDesigns: async () => [],

  listParts: async () => [
    {
      id: "sample-frame-1",
      name: "ImpulseRC Apex 5\" Frame",
      category: PartCategory.frame,
      specs: "Material: Carbon Fibre, Wheelbase: 225mm, Weight: 92g, Style: True-X",
      weight: 92,
      owner: "aaaaa-aa" as unknown as Principal,
      createdAt: BigInt(1700000000000),
      isSample: true,
      imageUrl: SAMPLE_IMAGE_URL,
    },
    {
      id: "sample-motor-1",
      name: "Emax ECO II 2306 1700KV",
      category: PartCategory.motor,
      specs: "KV: 1700, Stator: 2306, Max Current: 38A, Weight: 30g",
      weight: 30,
      owner: "aaaaa-aa" as unknown as Principal,
      createdAt: BigInt(1700000001000),
      isSample: true,
    },
    {
      id: "sample-battery-1",
      name: "Tattu R-Line 4S 1300mAh",
      category: PartCategory.battery,
      specs: "Cell count: 4S, Capacity: 1300mAh, Discharge: 95C, Weight: 175g",
      weight: 175,
      owner: "aaaaa-aa" as unknown as Principal,
      createdAt: BigInt(1700000002000),
      isSample: true,
    },
    {
      id: "sample-fc-1",
      name: "Betaflight F7 Flight Controller",
      category: PartCategory.flightController,
      specs: "MCU: STM32F745, Gyro: ICM-42688-P, OSD: Built-in, Weight: 8g",
      weight: 8,
      owner: "aaaaa-aa" as unknown as Principal,
      createdAt: BigInt(1700000003000),
      isSample: true,
    },
    {
      id: "sample-prop-1",
      name: "HQProp 5.1x4.6x3 V1S",
      category: PartCategory.propeller,
      specs: "Diameter: 5.1\", Pitch: 4.6, Blades: 3, Weight: 4g",
      weight: 4,
      owner: "aaaaa-aa" as unknown as Principal,
      createdAt: BigInt(1700000004000),
      isSample: true,
    },
    {
      id: "sample-camera-1",
      name: "RunCam Phoenix 2 FPV Camera",
      category: PartCategory.camera,
      specs: "Sensor: 1/2\" CMOS, FOV: 155°, Resolution: 1000TVL, Weight: 14g",
      weight: 14,
      owner: "aaaaa-aa" as unknown as Principal,
      createdAt: BigInt(1700000005000),
      isSample: true,
    },
  ],

  saveCallerUserProfile: async () => undefined,

  saveDesign: async (_name: string, _designData: string) => undefined,

  savePart: async (_input) => `user-${Date.now()}`,
};
