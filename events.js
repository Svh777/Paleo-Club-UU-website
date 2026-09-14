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
    },
    {
        title: 'Logo Contest',
        date: '2026-02-27',
        description: "Members entered a paleo-art contest to design a new club logo, with Marielle Greup's ammonite design voted the winner.",
        image: 'images/Logo Contest/1.png',
        alt: 'Logo Contest',
        details: 'logo-contest.html'
    },
    {
        title: 'Paleontology from a Bird\'s Eye Perspective',
        date: '2025-05-28',
        description: 'A mini symposium on fossil birds, from feather colours to marine fossils and the North Sea fossil record.',
        image: "images/Paleontology from a Bird's Eye Perspective/1.jpeg",
        alt: "Paleontology from a Bird's Eye Perspective",
        details: 'paleontology-birds-eye-perspective.html'
    },
    {
        title: 'Tour Evolution – Botanical Gardens',
        date: '2025-05-08',
        description: 'An exclusive guided tour of the new Evolution Garden, exploring the history of plant evolution with Dr. Edwin Post.',
        image: 'images/Tour Evolution part botanical gardens/1.jpg',
        alt: 'Tour Evolution – Botanical Gardens',
        details: 'tour-evolution-botanical-gardens.html'
    },
    {
        title: 'Whale Symposium',
        date: '2025-02-24',
        description: 'An afternoon exploring whales, from living cetaceans and strandings to their extinct relatives and evolutionary history.',
        image: 'images/Whale symposium/1.png',
        alt: 'Whale Symposium',
        details: 'whale-symposium.html'
    },
    {
        title: 'Behind the Scenes Tour – Natuurhistorisch Museum Rotterdam',
        date: '2025-01-24',
        description: "A behind-the-scenes look at the museum's extensive collections, guided by conservator Bram Langeveld.",
        image: 'images/Behind the scenes tour Natuurhistorisch Rotterdam/1.jpg',
        alt: 'Behind the Scenes Tour – Natuurhistorisch Museum Rotterdam',
        details: 'behind-the-scenes-tour-rotterdam.html'
    },
    {
        title: 'Hands-on Conodont Meeting',
        date: '2024-12-03',
        description: 'A hands-on session exploring conodont fossils, plus a lecture on fossil plants and a visit to the university collections.',
        image: 'images/Hands-on Conodont meeting/1.jpg',
        alt: 'Hands-on Conodont Meeting',
        details: 'hands-on-conodont-meeting.html'
    },
    {
        title: 'Visit to the Paleobotany Collection',
        date: '2024-11-19',
        description: 'A talk and guided visit exploring fossil plants and the Utrecht University paleobotany collections.',
        image: 'images/Visit to paleobotany collection/1.jpg',
        alt: 'Visit to the Paleobotany Collection',
        details: 'visit-to-paleobotany-collection.html'
    },
    {
        title: 'First Meeting of the Paleo Club',
        date: '2024-10-02',
        description: 'The very first Paleo Club UU meeting, bringing founding members together to kick off the club community.',
        details: 'first-meeting-paleo-club.html'
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
