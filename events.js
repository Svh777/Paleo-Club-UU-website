window.paleoClubEvents = [
    {
        title: 'Public Outreach Event',
        date: null,
        description: 'We are currently planning this event, come back later for more info.',
        details: 'public-outrech-event.html'
    },
    {
        title: 'Mosasaur Symposium',
        date: '2026-05-11',
        description: 'The Mosasaur Symposium brought the club together for a day focused on these spectacular marine reptiles.',
        image: 'images/Mosasaur symposium.jpeg',
        alt: 'Mosasaur Symposium',
        details: 'mosasaur-symposium.html'
    },
    {
        title: 'Paleoart Workshop by Joschua Knüppe',
        date: '2026-03-27',
        description: "A workshop on the scientific influence of paleoart, accurate reconstructions, and practical ways to visualize ancient environments.",
        image: 'images/WhatsApp Image 2026-03-27 at 20.41.24.jpeg',
        alt: 'Paleoart Workshop',
        details: 'paleoart-workshop.html'
    },
    {
        title: 'A Peek Inside the Fossil Botany Collection',
        date: '2026-01-28',
        description: "A behind-the-scenes visit to the university's fossil botany collection, including Carboniferous and Devonian specimens.",
        image: 'images/bijgesneden.jpeg',
        alt: 'Fossil Botany Collection',
        details: 'fossil-botany-collection.html'
    }
];

function getLocalDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatEventDate(date) {
    if (!date) {
        return 'Date to be announced';
    }

    return new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function renderEvents(list, type) {
    const today = getLocalDateString();
    const filteredEvents = window.paleoClubEvents
        .filter((event) => type === 'past' ? event.date && event.date < today : !event.date || event.date >= today)
        .sort((first, second) => {
            if (!first.date) return -1;
            if (!second.date) return 1;
            return type === 'past'
                ? second.date.localeCompare(first.date)
                : first.date.localeCompare(second.date);
        });

    if (filteredEvents.length === 0) {
        list.innerHTML = '<div class="col-12"><p class="text-muted">There are no events in this list right now.</p></div>';
        return;
    }

    list.innerHTML = filteredEvents.map((event) => `
        <div class="col-md-6 mb-4${event.date ? '' : ' event-undated'}">
            <article class="card p-4 shadow-sm h-100">
                ${event.image ? `<img src="${event.image}" alt="${event.alt || event.title}" class="img-fluid mb-3">` : ''}
                <p class="text-muted mb-2">${formatEventDate(event.date)}</p>
                <h2 class="h3">${event.details ? `<a class="read-more-link" href="${event.details}">${event.title}</a>` : event.title}</h2>
                <p>${event.description}</p>
            </article>
        </div>
    `).join('');
}

document.querySelectorAll('[data-event-list]').forEach((list) => {
    renderEvents(list, list.dataset.eventList);
});
