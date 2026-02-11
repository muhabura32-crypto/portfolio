import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BackgroundOption {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  type: "preset" | "custom";
}

export const backgroundOptions: BackgroundOption[] = [
  {
    id: "default",
    name: "Default",
    url: "",
    thumbnail: "",
    type: "preset",
  },
  {
    id: "gradient-1",
    name: "Ocean Blue",
    url: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    type: "preset",
  },
  {
    id: "gradient-2",
    name: "Sunset",
    url: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    type: "preset",
  },
  {
    id: "gradient-3",
    name: "Forest",
    url: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    thumbnail: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    type: "preset",
  },
  {
    id: "gradient-4",
    name: "Midnight",
    url: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
    thumbnail: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
    type: "preset",
  },
  {
    id: "gradient-5",
    name: "Aurora",
    url: "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)",
    thumbnail: "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)",
    type: "preset",
  },
  {
    id: "gradient-6",
    name: "Peach",
    url: "linear-gradient(135deg, #ed6ea0 0%, #ec8c69 100%)",
    thumbnail: "linear-gradient(135deg, #ed6ea0 0%, #ec8c69 100%)",
    type: "preset",
  },
  {
    id: "gradient-7",
    name: "Lavender",
    url: "linear-gradient(135deg, #acb6e5 0%, #86fde8 100%)",
    thumbnail: "linear-gradient(135deg, #acb6e5 0%, #86fde8 100%)",
    type: "preset",
  },
  {
    id: "gradient-8",
    name: "Dark Matter",
    url: "linear-gradient(135deg, #232526 0%, #414345 100%)",
    thumbnail: "linear-gradient(135deg, #232526 0%, #414345 100%)",
    type: "preset",
  },
];

interface BackgroundStoreProps {
  currentBackground: string;
  customBackgrounds: BackgroundOption[];
  selectedBackgroundId: string;
  setBackground: (background: string, id: string) => void;
  addCustomBackground: (option: BackgroundOption) => void;
  removeCustomBackground: (id: string) => void;
  resetBackground: () => void;
}

export const useBackgroundStore = create<BackgroundStoreProps>()(
  persist(
    (set) => ({
      currentBackground: "",
      customBackgrounds: [],
      selectedBackgroundId: "default",
      setBackground: (background: string, id: string) =>
        set({ currentBackground: background, selectedBackgroundId: id }),
      addCustomBackground: (option: BackgroundOption) =>
        set((state) => ({
          customBackgrounds: [...state.customBackgrounds, option],
          currentBackground: option.url,
          selectedBackgroundId: option.id,
        })),
      removeCustomBackground: (id: string) =>
        set((state) => ({
          customBackgrounds: state.customBackgrounds.filter((b) => b.id !== id),
          currentBackground: "",
          selectedBackgroundId: "default",
        })),
      resetBackground: () =>
        set({ currentBackground: "", selectedBackgroundId: "default" }),
    }),
    {
      name: "background-storage",
    }
  )
);
