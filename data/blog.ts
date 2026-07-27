export type BlogSection = {
  heading: "Introduction" | "Context" | "My role" | "Experience" | "Impact" | "Conclusion";
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: "International Experience" | "Youth Leadership" | "Education" | "Erasmus+" | "Student Representation" | "Projects" | "Events";
  location?: string;
  organization?: string;
  coverImage?: string;
  coverTheme: string;
  excerpt: string;
  tags: string[];
  linkedInUrl: string;
  relatedProjects?: string[];
  relatedExperiences?: string[];
  content: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "learning-through-youth-participation",
    title: "Learning Through Youth Participation",
    date: "2026-03-21",
    category: "International Experience",
    organization: "Youth participation programme",
    coverTheme: "from-indigo-600 via-blue-500 to-sky-300",
    excerpt: "A reflective look at participating in an international youth setting and the value of bringing a student perspective into shared conversations.",
    tags: ["youth participation", "international cooperation", "education", "student representation"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_im-grateful-for-the-opportunity-to-participate-activity-7441109267841064960-LCO2",
    content: [
      { heading: "Introduction", paragraphs: ["I had the opportunity to take part in a youth-focused international experience that reinforced a simple idea: young people contribute most when participation is treated as meaningful work rather than a symbolic gesture."] },
      { heading: "Context", paragraphs: ["International youth programmes create space for students and young people to compare challenges, exchange methods and find common ground across different educational systems. They are an important bridge between local experience and wider European cooperation."] },
      { heading: "My role", paragraphs: ["I joined the conversation as a student representative and participant, bringing the perspective of a young person who cares deeply about education, participation and the conditions in which students learn."] },
      { heading: "Experience", paragraphs: ["The most valuable part was listening closely to peers with different backgrounds while recognising how many of our concerns were shared. It was a reminder that collaboration depends on curiosity, clear communication and the willingness to learn from one another."] },
      { heading: "Impact", paragraphs: ["Experiences like this strengthen the confidence to contribute beyond one’s immediate environment. They also make international cooperation practical: a way to bring better questions, ideas and partnerships back to student communities."] },
      { heading: "Conclusion", paragraphs: ["I want to keep building on these exchanges by connecting student representation in Serbia with the wider conversations shaping youth participation across Europe."] },
    ],
  },
  {
    slug: "mental-health-and-meaningful-youth-participation",
    title: "Mental Health as a Foundation for Meaningful Youth Participation",
    date: "2026-03-28",
    category: "Education",
    organization: "Youth participation initiative",
    coverTheme: "from-sky-500 via-cyan-400 to-teal-300",
    excerpt: "Why student wellbeing, accessible support and participation belong in the same conversation about education.",
    tags: ["mental health", "youth participation", "education", "student wellbeing"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_mentalhealth-youthparticipation-education-activity-7443684750826938368-2tzT",
    relatedExperiences: ["PACT for Mental Health"],
    content: [
      { heading: "Introduction", paragraphs: ["Mental health and youth participation are often discussed separately. In practice, they are closely connected: students are more able to speak up, contribute and lead when they feel seen, supported and safe."] },
      { heading: "Context", paragraphs: ["Schools and youth organisations have a responsibility to create environments where wellbeing is not an afterthought. Education should make space for learning, challenge and ambition without ignoring the human experience behind them."] },
      { heading: "My role", paragraphs: ["As someone involved in student representation, I see advocacy as an opportunity to connect everyday student experiences with the decisions that shape school life. I contributed to this discussion from that perspective."] },
      { heading: "Experience", paragraphs: ["The conversation highlighted the importance of listening before proposing solutions. It also made clear that young people need more than invitations to participate; they need supportive structures that make participation sustainable."] },
      { heading: "Impact", paragraphs: ["Treating wellbeing as part of educational quality strengthens both students and institutions. It helps create a culture where participation, care and responsibility can reinforce each other."] },
      { heading: "Conclusion", paragraphs: ["I will continue to advocate for student spaces where young people can contribute honestly, grow with confidence and help shape the education they receive."] },
    ],
  },
  {
    slug: "leadership-through-project-management-and-empowerment",
    title: "Leadership Through Project Management and Youth Empowerment",
    date: "2026-04-18",
    category: "Youth Leadership",
    organization: "Youth leadership project",
    coverTheme: "from-violet-600 via-indigo-500 to-blue-400",
    excerpt: "A practical reflection on turning a shared idea into a project with clear responsibility, collaboration and purpose.",
    tags: ["leadership", "project management", "youth empowerment", "collaboration"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_leadership-projectmanagement-youthempowerment-activity-7451087113606905857-drKm",
    content: [
      { heading: "Introduction", paragraphs: ["Leadership is less about having all the answers and more about helping a group move from intention to action. This project experience gave me another opportunity to reflect on the discipline behind that process."] },
      { heading: "Context", paragraphs: ["Youth initiatives often begin with strong ideas but succeed through planning, trust and sustained follow-through. Project management gives those ideas a structure without taking away the creativity that makes them valuable."] },
      { heading: "My role", paragraphs: ["I contributed as a young person interested in leadership, organisation and communication. My focus was on understanding how responsibilities can be shared clearly while keeping the project connected to the people it serves."] },
      { heading: "Experience", paragraphs: ["Working through tasks, timelines and different perspectives reinforced the value of preparation. It also showed me that empowerment grows when people are trusted with real ownership rather than simply assigned work."] },
      { heading: "Impact", paragraphs: ["These skills transfer directly into student representation, design work and community projects. Better organisation gives young people more room to make ideas real and to create results that last beyond one event."] },
      { heading: "Conclusion", paragraphs: ["I am continuing to develop a leadership style that is practical, collaborative and grounded in the belief that young people are capable of shaping ambitious projects."] },
    ],
  },
  {
    slug: "erasmus-plus-student-mobility-beyond-the-classroom",
    title: "Erasmus+ Student Mobility: Learning Beyond the Classroom",
    date: "2026-04-18",
    category: "Erasmus+",
    organization: "Erasmus+",
    coverTheme: "from-blue-600 via-sky-500 to-cyan-300",
    excerpt: "How student mobility turns intercultural exchange into a lasting source of perspective, confidence and cooperation.",
    tags: ["Erasmus+", "student mobility", "education", "international cooperation"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_erasmusplus-studentmobility-education-activity-7451132407140847616-JtJt",
    relatedProjects: ["Digital Challenge"],
    content: [
      { heading: "Introduction", paragraphs: ["Erasmus+ mobility is more than travel. It is an opportunity to learn with people whose experiences, habits and educational contexts may be different from my own."] },
      { heading: "Context", paragraphs: ["European mobility programmes make international learning accessible to young people and connect education with cooperation, cultural exchange and active citizenship."] },
      { heading: "My role", paragraphs: ["I participated as a student eager to contribute, listen and bring the perspective of a Serbian high school student into a broader learning environment."] },
      { heading: "Experience", paragraphs: ["The exchange encouraged me to communicate more openly, adapt quickly and recognise the value of perspectives that initially feel unfamiliar. Those are lessons that cannot be fully reproduced in a classroom."] },
      { heading: "Impact", paragraphs: ["Mobility strengthens the skills students need for future cooperation: confidence, empathy, languages and the ability to work constructively across differences."] },
      { heading: "Conclusion", paragraphs: ["I see Erasmus+ as a powerful part of my educational path and want to keep using these experiences to support international cooperation among young people."] },
    ],
  },
  {
    slug: "celebrating-a-new-step-in-youth-work",
    title: "Celebrating a New Step in Youth Work",
    date: "2026-04-23",
    category: "Projects",
    coverTheme: "from-fuchsia-500 via-violet-500 to-indigo-400",
    excerpt: "A personal milestone that reflects the energy of shared work, new responsibilities and the people who make progress possible.",
    tags: ["youth work", "projects", "leadership", "community"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_im-incredibly-happy-to-share-some-great-activity-7453056999833010177-qImf",
    content: [
      { heading: "Introduction", paragraphs: ["Some updates are worth pausing for because they capture a meaningful step forward. This was one of those moments: an opportunity to recognise progress while staying focused on the work ahead."] },
      { heading: "Context", paragraphs: ["Youth projects are built through accumulated effort. Behind every visible milestone are conversations, preparation and people who choose to contribute their time and ideas."] },
      { heading: "My role", paragraphs: ["I approached this next step with gratitude and a sense of responsibility. It strengthened my commitment to work that connects student voice, creativity and practical action."] },
      { heading: "Experience", paragraphs: ["The experience reminded me to value the process as much as the result. Progress feels most meaningful when it is shared with people who challenge, support and inspire one another."] },
      { heading: "Impact", paragraphs: ["Marking milestones helps make youth work visible and encourages others to see participation as something they can actively shape. It can also build momentum for the next idea or initiative."] },
      { heading: "Conclusion", paragraphs: ["I am taking this energy into future projects with the same goal: to make work that is useful, collaborative and rooted in real student and youth needs."] },
    ],
  },
  {
    slug: "bringing-student-perspectives-to-consultation",
    title: "Bringing Student Perspectives to a Consultation",
    date: "2026-04-26",
    category: "Student Representation",
    organization: "Consultation process",
    coverTheme: "from-amber-400 via-orange-400 to-rose-500",
    excerpt: "Why consultation matters when it creates room for students to contribute knowledge drawn from their everyday educational experience.",
    tags: ["student representation", "consultation", "advocacy", "education"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_two-days-ago-i-took-part-in-a-consultation-activity-7454090261292281856-TuH9",
    content: [
      { heading: "Introduction", paragraphs: ["I took part in a consultation that offered a valuable space to bring student perspectives into a structured conversation about issues that affect young people."] },
      { heading: "Context", paragraphs: ["Consultations are most useful when they treat those directly affected by a decision as knowledgeable contributors. Students understand the daily realities of education and should be part of shaping its direction."] },
      { heading: "My role", paragraphs: ["My contribution came from my experience in student representation: listening to peers, identifying common concerns and expressing them clearly in a wider setting."] },
      { heading: "Experience", paragraphs: ["The process reinforced the importance of preparation and careful language. Advocacy is strongest when it combines personal experience with a constructive focus on possible improvements."] },
      { heading: "Impact", paragraphs: ["Including student voices in consultations can make policies and projects more grounded. It also signals to young people that their participation is expected and valued."] },
      { heading: "Conclusion", paragraphs: ["I will continue to seek out and support spaces where students can move from being consulted occasionally to being involved consistently."] },
    ],
  },
  {
    slug: "a-responsibility-to-represent-students",
    title: "A Responsibility to Represent Students",
    date: "2026-05-08",
    category: "Student Representation",
    coverTheme: "from-slate-500 via-indigo-500 to-violet-400",
    excerpt: "A reflection on the honour and responsibility of contributing to opportunities that amplify student voice.",
    tags: ["student representation", "youth participation", "advocacy", "leadership"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_i-am-deeply-honored-to-have-had-the-opportunity-activity-7458610647866429440-CdXv",
    content: [
      { heading: "Introduction", paragraphs: ["I was deeply honoured by an opportunity that reaffirmed why I care about student representation: young people deserve to be present in the conversations that define their education and future."] },
      { heading: "Context", paragraphs: ["Representation is not a title alone. It is a commitment to listen, report back, build trust and make sure that a wide range of student experiences is reflected in the work being done."] },
      { heading: "My role", paragraphs: ["I took part with a strong sense of responsibility to my peers and to the organisations that make student participation possible. My aim was to contribute thoughtfully and learn from the experience."] },
      { heading: "Experience", paragraphs: ["The opportunity showed me how much preparation and humility matter. Representing others requires both the confidence to speak and the discipline to remain open to what others need and know."] },
      { heading: "Impact", paragraphs: ["Every serious representation opportunity builds capacity. It gives young people experience with dialogue, advocacy and accountability—skills that strengthen both schools and democratic culture."] },
      { heading: "Conclusion", paragraphs: ["I am motivated to carry this responsibility forward by keeping student voice at the centre of my leadership and project work."] },
    ],
  },
  {
    slug: "three-days-of-european-youth-cooperation",
    title: "Three Days of European Youth Cooperation",
    date: "2026-05-11",
    category: "Events",
    organization: "European youth event",
    coverTheme: "from-emerald-500 via-teal-500 to-sky-400",
    excerpt: "A three-day experience centred on exchange, collaboration and the common challenges that connect young people across Europe.",
    tags: ["international cooperation", "youth participation", "Europe", "events"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_from-may-8th-to-10th-i-had-the-incredible-activity-7459548169354498048-5_Ww",
    content: [
      { heading: "Introduction", paragraphs: ["From 8 to 10 May, I took part in a three-day youth experience that brought together exchange, collaboration and the energy that comes from working with peers across Europe."] },
      { heading: "Context", paragraphs: ["Short, intensive youth events can create a strong foundation for international cooperation. They allow participants to test ideas together, understand different realities and build relationships that continue after the programme ends."] },
      { heading: "My role", paragraphs: ["I participated as a student and youth representative, contributing my own experiences while learning how other young people approach participation, education and community work."] },
      { heading: "Experience", paragraphs: ["The pace of the event made collaboration especially important. I learned again that the best exchanges leave room for both structured discussion and the informal conversations where trust is built."] },
      { heading: "Impact", paragraphs: ["International youth events make cooperation tangible. They help transform broad ideas about Europe into relationships, shared learning and practical motivation for local action."] },
      { heading: "Conclusion", paragraphs: ["I left with new perspectives and a stronger commitment to keep connecting student representation in Serbia with international youth cooperation."] },
    ],
  },
  {
    slug: "board-service-at-unss-building-student-voice",
    title: "Building Student Voice Through Board Service at UNSS",
    date: "2026-05-16",
    category: "Student Representation",
    organization: "Union of High School Students of Serbia (UNSS)",
    coverTheme: "from-rose-500 via-fuchsia-500 to-violet-500",
    excerpt: "What board-level work at the Union of High School Students of Serbia means for advocacy, responsibility and student participation.",
    tags: ["UNSS", "student representation", "leadership", "advocacy", "youth participation"],
    linkedInUrl: "https://www.linkedin.com/posts/dositej-jovanovi%C4%87-b91b3235a_yesterday-as-a-board-member-of-unija-srednjo%C5%A1kolaca-activity-7461319331528855552-tdNo",
    relatedExperiences: ["Union of High School Students of Serbia"],
    content: [
      { heading: "Introduction", paragraphs: ["As a board member of the Union of High School Students of Serbia, I see every activity as part of a larger responsibility: helping ensure that students can participate meaningfully in the issues that shape their lives."] },
      { heading: "Context", paragraphs: ["UNSS brings together high school students around advocacy, participation and the improvement of student life. Its work depends on young people who are willing to organise, listen and act collectively."] },
      { heading: "My role", paragraphs: ["My role on the board involves contributing to the organisation’s direction while staying connected to the experiences and needs of students. It combines practical responsibility with the privilege of representing a wider community."] },
      { heading: "Experience", paragraphs: ["Board work has taught me the importance of consistency: preparing carefully, communicating clearly and supporting a team through both visible activities and the planning that happens behind them."] },
      { heading: "Impact", paragraphs: ["Strong student organisations make participation more accessible and advocacy more sustained. They give students a platform to move from individual concerns to shared priorities and action."] },
      { heading: "Conclusion", paragraphs: ["I am committed to continuing this work with UNSS and to helping build a student movement that is informed, inclusive and ready to contribute nationally and internationally."] },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
