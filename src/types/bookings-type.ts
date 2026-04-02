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

 