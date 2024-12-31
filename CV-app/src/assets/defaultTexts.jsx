export default {
  name: { default: "Name", isInput: true },

  contact: { default: "Your Contact Details", isInput: false },

  intro: { default: "Brief introduction about yourself...", isInput: false },

  employment: {
    title: "Employment History",
    heading: "Place of Employment (Year)",
    desc: "Description of job",
  },

  education: {
    title: "Education History",
    heading: "Place of Education (Year)",
    desc: "Description of education",
  },

  skills: {
    title: "Skills",
    text: "Acquired Skill",
  },

  licenses: {
    title: "Licenses",
    text: "Acquired license/accreditation (Year)",
  },
  extras: { text: "Any extra information", title: "Extras" },
};
