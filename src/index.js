const jobsHeading = document.querySelector(".jobs-list-container h2");
const jobsContainer = document.querySelector(".jobs-list-container .jobs");
const jobSearch = document.querySelector(".jobs-list-container .job-search");

let searchTerm = "";

const fetchJobs = () => {
  fetch("https://json-server-phase-1-project-c37n.onrender.com/jobs")
    .then(res => res.json())
    .then((data) => {

      if (data.length == 1) {
        jobsHeading.innerHTML = `${data.length} Job`;
      } else {
        jobsHeading.innerHTML = `${data.length} Jobs`;
      }

      const createJobListingCards = () => {
        jobsContainer.innerHTML = "";

        data.forEach((job) => {
          if (job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            let jobCard = document.createElement("div");
            jobCard.classList.add("job");

            let image = document.createElement("img");
            image.src = job.image;

            let title = document.createElement("h3");
            title.innerHTML = job.title;
            title.classList.add("job-title");

            let details = document.createElement("div");
            details.innerHTML = job.details;
            details.classList.add("details");

            let detailsBtn = document.createElement("a");
            detailsBtn.href = job.link;
            detailsBtn.innerHTML = "More Details";
            detailsBtn.classList.add("details-btn");
            detailsBtn.target = "blank"

            let openPositions = document.createElement("span");
            openPositions.classList.add("open-positions");

            if (job.openPositions == 1) {
              openPositions.innerHTML = `${job.openPositions} open position`;
            } else {
              openPositions.innerHTML = `${job.openPositions} open positions`;
            }

            jobCard.appendChild(image);
            jobCard.appendChild(title);
            jobCard.appendChild(details);
            jobCard.appendChild(detailsBtn);
            jobCard.appendChild(openPositions);

            jobsContainer.appendChild(jobCard);
          }
        });
      };

      createJobListingCards();
    })
    
};

fetchJobs();

jobSearch.addEventListener("input", (e) => {
  searchTerm = e.target.value;

  fetchJobs();
});