'use client';
import { toast } from 'react-toastify';
import { BehaviorSubject } from "rx";

// for global loader service
export const isLoading = new BehaviorSubject<boolean>(false);

export const isDialogOpen = new BehaviorSubject<any>({
  open: false,
  data: { message: "Are you Sure?", title: "" },
  cancelText: "Cancel",
  confirmText: "Okay",
  onConfirm: () => { },
});

export const forSuccess = (message: string, id?: string) =>
  toast.success(message, { autoClose: 3000, toastId: id ? id : 1 })

export const forError = (message: string, id?: string) =>
  toast.error(message, { autoClose: 3000, toastId: id ? id : 1 })

export const forWarning = (message: string, id?: string) =>
  toast.warning(message, { autoClose: 3000, toastId: id ? id : 1 })



// Debounce utility function
export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 1000,
): DebouncedFunction<T> => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: Parameters<T>): void {
    const context = this as unknown;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};