/**
 * Theme Mode
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Toast Notification Type
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast Notification
 */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

/**
 * Modal State
 */
export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: unknown;
}

/**
 * Sidebar State
 */
export interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
}

/**
 * Breadcrumb Item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

import type { ReactNode } from 'react';

/**
 * Table Column Definition
 */
export interface TableColumn<T> {
  id: string;
  label: string;
  accessor: keyof T | ((row: T) => ReactNode);
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Sort Configuration
 */
export interface SortConfig {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Filter Configuration
 */
export interface FilterConfig {
  field: string;
  value: unknown;
  operator?: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains';
}
