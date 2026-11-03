import { useState } from "react";
import Page from "../components/layout/Page";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventContext";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import type { Category } from "../types/campus-event";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <Page title="Tüm Etkinlikler" text="Ekim ayında kampüste düzenlenen etkinlikler.">
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      {filtered.length > 0 && <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>}
      <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </Page>
  );
}

export default EventsPage;
