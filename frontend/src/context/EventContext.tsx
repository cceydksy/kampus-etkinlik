import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventContextValue {
  events: CampusEvent[];
  addEvent: (event: CampusEvent) => void;
  updateEvent: (event: CampusEvent) => void;
  deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextValue | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(event: CampusEvent) {
    setEvents((list) => [...list, event]);
  }

  function updateEvent(event: CampusEvent) {
    setEvents((list) => list.map((e) => (e.id === event.id ? event : e)));
  }

  function deleteEvent(id: string) {
    setEvents((list) => list.filter((e) => e.id !== id));
  }

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents, EventProvider içinde kullanılmalı");
  return context;
}
