// Site content and settings. Edit this file to update the portfolio —
// no other file needs to change.

// Each piece links to its page on the Notion portfolio.
const N = 'https://app.notion.com/p/';

window.SITE = {
  settings: {
    // Path or link to your resume PDF.
    resumeUrl: 'assets/Writing_Resume.pdf',
    // Lines carousel: move on by itself. Each line stays for its reading time
    // (word count ÷ reading speed) plus a few extra seconds.
    autoplay: true,
    readingWpm: 238,
    extraSeconds: 3,
    // Contact block colour: 'Sage', 'Terracotta' or 'Ink'.
    contactStyle: 'Sage',
  },

  // Your works: title, type, year, blurb, url. The filter buttons follow the order
  // types first appear here, and the first type is shown when the page loads.
  works: [
    // Lyrics / Songs
    { title: 'Aadha', type: 'Lyrics / Songs', year: '', blurb: 'Written and composed by me. Radha as the passion we leave behind for adult responsibilities, and the life that feels half-finished without it.', url: N + 'Aadha-31fe9ea8481c80c888a4f48b9510f92f' },
    { title: 'Maa', type: 'Lyrics / Songs', year: '2024', blurb: 'From Kathamrit, Hostel 2’s first-place MDGC play: a successful man’s song to the mother he left unhappy.', url: N + 'Maa-31fe9ea8481c80e7a791e4ece69563de' },
    { title: 'Marghat ki seema', type: 'Lyrics / Songs', year: '2024', blurb: 'Opening song of Kathamrit, sung by a mandali on a holy river bank: when one story ends, another begins.', url: N + 'Marghat-ki-seema-31fe9ea8481c802d84d6e2c2afb6faea' },
    { title: 'Shor', type: 'Lyrics / Songs', year: '', blurb: 'Hostel 2’s entry for Goonj GC, which took first place among more than 10 compositions.', url: N + 'Shor-Goonj-GC-31fe9ea8481c802f9456dbab1ad92878' },
    { title: 'Inter IIT stage play setup', type: 'Lyrics / Songs', year: '2024', blurb: 'The song that sets up the world of IIT Bombay’s stage play at Inter-IIT Patna, in the meter of “Suno Re Kissa”.', url: N + 'Inter-IIT-stage-play-setup-31fe9ea8481c801c9426d76d13522295' },
    // Scripts
    { title: 'A murder a day', type: 'Scripts', year: '', blurb: "Abhi's world topples when he encounters a special target at his second job as an assassin, which he took to pay hospital bills for her mother in coma.", url: N + 'A-murder-a-day-3d5e9ea8481c80c8b0dee1854f3e6ceb' },
    { title: 'Two Worlds', type: 'Scripts', year: '', blurb: 'Akshay, a rich kid shares a beautiful moment with homeless Mukul, when both of them learn about the concept of money very differently from their mothers.', url: N + 'Two-Worlds-3d5e9ea8481c80bd8cd0df838ae582e8' },
   
    // Articles (Substack)
    { title: 'Meaning of life', type: 'Articles', year: '2026', blurb: 'What are we here for? From self-replicating molecules to conscious beings, and finding purpose as observers of the universe.', url: 'https://owlagarwal.substack.com/p/meaning-of-life' },
    { title: 'Indian obsession with English', type: 'Articles', year: '2026', blurb: 'Why the language matters in this nation more than it should? Tracing back to colonial times, the language becomes an indicator of class and intellect.', url: 'https://owlagarwal.substack.com/p/indian-obsession-with-english?r=8m7um5&utm_campaign=post-expanded-share&utm_medium=web' },

    // Poetry
    { title: 'Sab likha hai (?)', type: 'Poetry', year: '', blurb: 'If everything is already written, why does the farmer who feeds the world have a hungry child?', url: N + 'Sab-likha-hai-31fe9ea8481c8098be4aeb0256f683b1' },
    { title: 'Kahaani', type: 'Poetry', year: '', blurb: 'Written for MDGC: a story that asks to be heard without fear and to light up a city with knowledge.', url: N + 'Kahaani-MDGC-31fe9ea8481c8056abb0d8c092e061d5' },
    { title: 'Shaksiyat', type: 'Poetry', year: '', blurb: 'On the people, dreams, words and deeds that last, and the ones that fade.', url: N + 'Shaksiyat-31fe9ea8481c80b98313e06e66decc39' },
    { title: 'Song of life', type: 'Poetry', year: '', blurb: 'There are songs for every feeling, but only a few people hear the silent song of life.', url: N + 'Song-of-life-31fe9ea8481c80efad95c94d5859b599' },

    // Others
    { title: 'The Goa Expedition', type: 'Others', year: '', blurb: 'A storytelling vlog of a college trip to Goa.', url: N + 'The-Goa-Expedition-32be9ea8481c8039bb76d0a59dbd07bb' },
    { title: 'Kshitij', type: 'Others', year: '', blurb: 'Hostel 2’s film for Film GC. I helped with direction, locations and sound post-production.', url: N + 'Kshitij-336e9ea8481c80c3b418d31c0b6315e2' },
    { title: 'Fish Fritters', type: 'Others', year: '', blurb: 'A short story about Amarnath, a Kolkata bank clerk, and a simple monsoon dream of tea and hot fish fritters.', url: N + 'Fish-Fritters-32be9ea8481c80a6a854ca242ec1d9d8' },
  ],

  // Carousel lines: text (use \n for line breaks), source, url
  lines: [
    { text: 'We might be microscopic at the level of space and time in front of this infinite appearing universe, but as conscious living beings we become the observers that legitimatize the very existence of it.', source: 'Meaning of life', url: 'https://owlagarwal.substack.com/p/meaning-of-life' },
    { text: 'Jigyasa se nazar dali jo,\nKuch purane chehro par,\nKuch ban gaye shaksiyat,\nBaaki shaks ban kar reh gaye', source: 'Shaksiyat', url: N + 'Shaksiyat-31fe9ea8481c80b98313e06e66decc39' },
    { text: 'Sab likha hai to fir kahi pe aandhi, baadh kahi pe sukha kyu\nDuniya ka pet bhare kisaan jo, uska bachcha bhuka kyu', source: 'Sab likha hai (?)', url: N + 'Sab-likha-hai-31fe9ea8481c8098be4aeb0256f683b1' },
    { text: 'Dil yeh khokla hai mera, isme tu sama jaa maa\nRuth jaana mujhse lekin, dur na tu jaana maa\nRuth jaa tu mujhse lekin, dur na tu jaana maa', source: 'Maa', url: N + 'Maa-31fe9ea8481c80e7a791e4ece69563de' },
    { text: 'The car moves forward and the spot on footpath where Mukul and the family was sitting is left behind, Akshay peeks out of the window to catch one final look and he sees Mukul also stood up to have one final look at the car, this time they see each other and recognize each other’s existence at the same time.', source: 'Two Worlds', url: N + 'Two-Worlds-3d5e9ea8481c80bd8cd0df838ae582e8' },
  ],
};
