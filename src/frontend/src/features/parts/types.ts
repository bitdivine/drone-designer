export type PartCategory =
  | "frame"
  | "motor"
  | "propeller"
  | "battery"
  | "flightController"
  | "camera";

export const PART_CATEGORIES: {
  value: PartCategory;
  label: string;
  icon: string;
}[] = [
  { value: "frame", label: "Frames", icon: "🏗️" },
  { value: "motor", label: "Motors", icon: "⚙️" },
  { value: "propeller", label: "Propellers", icon: "🌀" },
  { value: "battery", label: "Batteries", icon: "🔋" },
  { value: "flightController", label: "Flight Controllers", icon: "🖥️" },
  { value: "camera", label: "Cameras", icon: "📷" },
];

export interface Part {
  id: string;
  category: PartCategory;
  name: string;
  specs: string;
  weight: number;
  createdAt: number;
  isSample: boolean;
  owner: string;
  imageUrl?: string;
}

export interface PartInput {
  id: string;
  category: PartCategory;
  name: string;
  specs: string;
  weight: number;
  imageUrl?: string;
}

export const SAMPLE_PARTS: Part[] = [
  // Frames
  {
    id: "sample-frame-1",
    category: "frame",
    name: "iFlight Nazgul5 V3",
    specs:
      'Size: 5", Type: Quadcopter, Material: Carbon Fiber, Wheelbase: 224mm',
    weight: 75,
    createdAt: 1700000000000,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-frame-2",
    category: "frame",
    name: "TBS Source One V5",
    specs:
      'Size: 5", Type: Quadcopter, Material: Carbon Fiber, Wheelbase: 220mm',
    weight: 69,
    createdAt: 1700000000001,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-frame-3",
    category: "frame",
    name: "Diatone Roma L5 V2",
    specs:
      'Size: 5", Type: Quadcopter, Material: Carbon Fiber, Wheelbase: 226mm',
    weight: 90,
    createdAt: 1700000000002,
    isSample: true,
    owner: "system",
  },
  // Motors
  {
    id: "sample-motor-1",
    category: "motor",
    name: "Emax ECO II 2306",
    specs: "KV: 1700, Stator: 2306, Max Current: 38A, Shaft: 5mm",
    weight: 30,
    createdAt: 1700000000003,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-motor-2",
    category: "motor",
    name: "T-Motor F40 Pro IV",
    specs: "KV: 2400, Stator: 2306, Max Current: 36A, Shaft: 5mm",
    weight: 28,
    createdAt: 1700000000004,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-motor-3",
    category: "motor",
    name: "BrotherHobby Tornado T5",
    specs: "KV: 2550, Stator: 2207, Max Current: 40A, Shaft: 5mm",
    weight: 32,
    createdAt: 1700000000005,
    isSample: true,
    owner: "system",
  },
  // Propellers
  {
    id: "sample-prop-1",
    category: "propeller",
    name: "HQProp 5.1×4.6×3",
    specs: 'Size: 5.1", Pitch: 4.6", Blades: 3, Material: PC',
    weight: 4,
    createdAt: 1700000000006,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-prop-2",
    category: "propeller",
    name: "Gemfan 51433",
    specs: 'Size: 5.1", Pitch: 4.3", Blades: 3, Material: PC',
    weight: 5,
    createdAt: 1700000000007,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-prop-3",
    category: "propeller",
    name: "Azure Power 5146",
    specs: 'Size: 5.1", Pitch: 4.6", Blades: 3, Material: Polycarbonate',
    weight: 4,
    createdAt: 1700000000008,
    isSample: true,
    owner: "system",
  },
  // Batteries
  {
    id: "sample-battery-1",
    category: "battery",
    name: "Tattu R-Line V4 1300mAh 6S",
    specs: "Cells: 6S, Capacity: 1300mAh, C-Rating: 130C, Voltage: 22.2V",
    weight: 195,
    createdAt: 1700000000009,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-battery-2",
    category: "battery",
    name: "CNHL Black Series 1500mAh 4S",
    specs: "Cells: 4S, Capacity: 1500mAh, C-Rating: 100C, Voltage: 14.8V",
    weight: 168,
    createdAt: 1700000000010,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-battery-3",
    category: "battery",
    name: "GNB 850mAh 4S",
    specs: "Cells: 4S, Capacity: 850mAh, C-Rating: 120C, Voltage: 14.8V",
    weight: 105,
    createdAt: 1700000000011,
    isSample: true,
    owner: "system",
  },
  // Flight Controllers
  {
    id: "sample-fc-1",
    category: "flightController",
    name: "Betaflight F7 45A AIO",
    specs: "Processor: STM32F745, Gyro: ICM42688P, ESC: 45A, OSD: AT7456E",
    weight: 9,
    createdAt: 1700000000012,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-fc-2",
    category: "flightController",
    name: "Matek H743-WING V3",
    specs: "Processor: STM32H743, Gyro: ICM42688P, UARTs: 8, Barometer: DPS310",
    weight: 11,
    createdAt: 1700000000013,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-fc-3",
    category: "flightController",
    name: "SpeedyBee F405 V4",
    specs: "Processor: STM32F405, Gyro: ICM42688P, ESC: 45A, Bluetooth: Yes",
    weight: 8,
    createdAt: 1700000000014,
    isSample: true,
    owner: "system",
  },
  // Cameras
  {
    id: "sample-camera-1",
    category: "camera",
    name: "Foxeer Razer Mini",
    specs:
      'Type: FPV Analog, Sensor: 1/3" CMOS, Resolution: 1200TVL, FOV: 130°',
    weight: 13,
    createdAt: 1700000000015,
    isSample: true,
    owner: "system",
    imageUrl: "/assets/sample-component.jpg",
  },
  {
    id: "sample-camera-2",
    category: "camera",
    name: "RunCam Phoenix 2",
    specs:
      'Type: FPV Analog, Sensor: 1/2" CMOS, Resolution: 1000TVL, FOV: 155°',
    weight: 14,
    createdAt: 1700000000016,
    isSample: true,
    owner: "system",
  },
  {
    id: "sample-camera-3",
    category: "camera",
    name: "GoPro Hero 11 Black Mini",
    specs:
      "Type: HD Action Cam, Resolution: 5.3K, Stabilization: HyperSmooth 5.0",
    weight: 54,
    createdAt: 1700000000017,
    isSample: true,
    owner: "system",
  },
];
