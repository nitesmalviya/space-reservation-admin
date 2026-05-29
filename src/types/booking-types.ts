export interface GetBookingsDataInput {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  organizationId?: string;
  spaceId?: string;
}

export interface BookingItem {
  id: string;
  startTime: string;
  endTime: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  createdAt: string;

  user: {
    name: string;
  };

  space: {
    name: string;
  };

  organization: {
    name: string;
  };
}

export interface Booking {
  createdAt: any;
  id: string;
  status: string;
  startTime: string;
  endTime: string;
  date: string;
  space: {
    name: string;
  };
  organization: {
    name: string;
  };
  user: {
    name: string;
  };
}

export interface BookingsDataResponse {
  items: Booking[];
}


export interface bookingRulles {
  message(message: any): unknown;
  success: any;
  advanceBookingWindow?: string;
  minNoticePeriod: string;
  cancellationWindow: number;
  bufferTime: string;
  requireAdminApproval: boolean;
  autoApproveBookings: boolean;
  id: string;
  createdAt?: string;
  orgId: string;
  updateBookingRules: bookingRulles;
}
export interface UpdateBookingRulesInput {
  orgId: string;
  advanceBookingWindow: string;
  minNoticePeriod: string;
  cancellationWindow: string;
  bufferTime: string;
  requireAdminApproval: boolean;
  autoApproveBookings: boolean;
}

export interface BookingRulesData {
  id: string;
  orgId: string;
  advanceBookingWindow: string;
  minNoticePeriod: string;
  cancellationWindow: string;
  bufferTime: string;
  requireAdminApproval: boolean;
  autoApproveBookings: boolean;
}
export interface UpdateBookingRulesResponse {
  updateBookingRules: {
    data: BookingRulesData;
    success: boolean;
    message: string;
  };
}


// get booking rules 
export interface BookingRulesInput {
  id: string;
  createdAt?: string;
  orgId: string;
  advanceBookingWindow: string;
  minNoticePeriod: string;
  cancellationWindow: string;
  bufferTime: string;
  requireAdminApproval: boolean;
  autoApproveBookings: boolean;
  bookingRules: bookingRulles;
}


export interface BookingRulesResponse {
  id: any;
  requireAdminApproval: boolean | undefined;
  autoApproveBookings: boolean | undefined;
  bufferTime: string | number | readonly string[] | undefined;
  cancellationWindow: string | number | readonly string[] | undefined;
  minNoticePeriod: string | number | readonly string[] | undefined;
  advanceBookingWindow: string | number | readonly string[] | undefined;
  bookingRules: {
    data: BookingRulesData;
    success: boolean;
    message: string;
  };
}


export interface BookingRulesDataType {
  id: string;
  orgId: string;
  advanceBookingWindow: string;
  minNoticePeriod: string;
  cancellationWindow: string;
  bufferTime: string;
  requireAdminApproval: boolean;
  autoApproveBookings: boolean;
}

export interface UpdateBookingRulesInput {
  orgId: string;
  advanceBookingWindow: string;
  minNoticePeriod: string;
  cancellationWindow: string;
  bufferTime: string;
  requireAdminApproval: boolean;
  autoApproveBookings: boolean;
}

export interface UpdateBookingRulesResponse {
  updateBookingRules: {
    success: boolean;
    message: string;
  };
}