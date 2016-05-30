if(typeof(localStorage.favorites) === "undefined") {
	localStorage.favorites = JSON.stringify([
		{
			start: Date.UTC(2016, 7, 5, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 6, 0, 0, 0, 0),
			dayInMonth: "05",
			name: "Fredag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 6, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 7, 0, 0, 0, 0),
			dayInMonth: "06",
			name: "Lördag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 7, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 8, 0, 0, 0, 0),
			dayInMonth: "07",
			name: "Söndag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 8, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 9, 0, 0, 0, 0),
			dayInMonth: "08",
			name: "Måndag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 9, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 10, 0, 0, 0, 0),
			dayInMonth: "09",
			name: "Tisdag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 10, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 11, 0, 0, 0, 0),
			dayInMonth: "10",
			name: "Onsdag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 11, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 12, 0, 0, 0, 0),
			dayInMonth: "11",
			name: "Torsdag",
			activities: [],
		},
	]);
}

AData = {
	ui: {

	},
	pages: {
		history: [],
		current: null,
	},
	activities: {},
	days: [
		{
			start: Date.UTC(2016, 7, 5, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 6, 0, 0, 0, 0),
			dayInMonth: "05",
			name: "Fredag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 6, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 7, 0, 0, 0, 0),
			dayInMonth: "06",
			name: "Lördag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 7, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 8, 0, 0, 0, 0),
			dayInMonth: "07",
			name: "Söndag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 8, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 9, 0, 0, 0, 0),
			dayInMonth: "08",
			name: "Måndag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 9, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 10, 0, 0, 0, 0),
			dayInMonth: "09",
			name: "Tisdag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 10, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 11, 0, 0, 0, 0),
			dayInMonth: "10",
			name: "Onsdag",
			activities: [],
		},
		{
			start: Date.UTC(2016, 7, 11, 0, 0, 0, 0),
			end: Date.UTC(2016, 7, 12, 0, 0, 0, 0),
			dayInMonth: "11",
			name: "Torsdag",
			activities: [],
		},
	],
	favorites: JSON.parse(localStorage.favorites),
};

for(var d = 0; d < 7; ++d) {
	var day = AData.favorites[d];

	for(var a = 0; a < day.activities.length; ++a) {
		var activity = day.activities[a];

		activity.start = new Date(activity.start);

		activity.end = new Date(activity.end);
	}
}

AUI = {
	backButton: document.getElementById("BackButton"),
	reloadButton: document.getElementById("ReloadButton"),
	addFavoriteButton: document.getElementById("AddFavoriteButton"),
	removeFavoriteButton: document.getElementById("RemoveFavoriteButton"),
	pages: {
		Index: {
			element: document.getElementById("IndexPage"),
			showReloadButton: false,
			showAddFavoriteButton: false,
			showRemoveFavoriteButton: false,
			OnOpen: function() {

			},
		},
		Program: {
			element: document.getElementById("ProgramPage"),
			showReloadButton: false,
			showAddFavoriteButton: false,
			showRemoveFavoriteButton: false,
			OnOpen: function() {
				this.element.innerHTML = "<h1 class=\"bg-red\">Program</h1>";

				for(var d = 0; d < 7; ++d) {
					var day = AData.days[d];

					if(Date.now() < day.end) {
						this.element.innerHTML += "<div class=\"day\">" + day.name + " " + day.dayInMonth + " augusti</div>";

						for(var a = 0; a < day.activities.length; ++a) {
							var activity = day.activities[a];

							if(Date.now() < activity.end) {
								var startHour = 9 < activity.start.getHours() ? activity.start.getHours() : "0" + activity.start.getHours();

								var startMinute = 9 < activity.start.getMinutes() ? activity.start.getMinutes() : "0" + activity.start.getMinutes();

								var start = startHour + ":" + startMinute;

								var endHour = 9 < activity.end.getHours() ? activity.end.getHours() : "0" + activity.end.getHours();

								var endMinute = 9 < activity.end.getMinutes() ? activity.end.getMinutes() : "0" + activity.end.getMinutes();

								var end = endHour + ":" + endMinute;

								this.element.innerHTML +=
									"<a class=\"item\" onclick=\"javascript:APages.Open('Activity', " + activity.id + ");\">" +
										"<span class=\"title\">" + activity.name + "</span><br />" +
										"<span class=\"organizer\">" + activity.organizer + "</span><br />" +
										"<span class=\"time_and_location\">" + start + " - " + end + ", " + activity.location + "</span>" +
									"</a>"
								;
							}
						}
					}
				}
			},
		},
		Activity: {
			element: document.getElementById("ActivityPage"),
			showReloadButton: false,
			showAddFavoriteButton: true,
			showRemoveFavoriteButton: false,
			activity: null,
			OnOpen: function(pvId) {
				var activity = AData.activities[pvId];

				var startHour = 9 < activity.start.getHours() ? activity.start.getHours() : "0" + activity.start.getHours();

				var startMinute = 9 < activity.start.getMinutes() ? activity.start.getMinutes() : "0" + activity.start.getMinutes();

				var start = startHour + ":" + startMinute;

				var endHour = 9 < activity.end.getHours() ? activity.end.getHours() : "0" + activity.end.getHours();

				var endMinute = 9 < activity.end.getMinutes() ? activity.end.getMinutes() : "0" + activity.end.getMinutes();

				var end = endHour + ":" + endMinute;

				this.element.innerHTML =
					"<h1 class=\"bg-red\">" + activity.name + "</h1>" +
					"<div>" +
						"<div><p><i>" + activity.organizer + "</i></p><p>" + start + " - " + end + ", " + activity.location + "</p></div>" +
						"<p>" + activity.description + "</p>" +
					"</div>" +
					"<div class=\"map\"><img src=\"img/staticmap.png\" /></div>"
				;

				this.activity = activity;

				if(0 <= this.GetIndexOfFavorite()) {
					this.showAddFavoriteButton = false;

					this.showRemoveFavoriteButton = true;
				}
				else {
					this.showAddFavoriteButton = true;

					this.showRemoveFavoriteButton = false;
				}

				//<!--http://maps.googleapis.com/maps/api/staticmap?format=png&sensor=false&size=360x270&scale=2&zoom=14&maptype=roadmap&center=Malm%C3%B6%20C&markers=Malm%C3%B6%20C&key=AIzaSyA-y5xIFqu4NyxuqlDGMyIIsVqAJDQ8ugk-->
			},
			OnAddFavorite: function() {
				AUI.addFavoriteButton.style.right = "-64px";

				AUI.removeFavoriteButton.style.right = "0px";

				var index = this.GetPotentialIndexOfFavorite();

				AData.favorites[this.activity.day].activities.splice(index, 0, this.activity);

				localStorage.favorites = JSON.stringify(AData.favorites);
			},
			OnRemoveFavorite: function() {
				AUI.addFavoriteButton.style.right = "0px";

				AUI.removeFavoriteButton.style.right = "-64px";

				var index = this.GetIndexOfFavorite();

				if(0 <= index) {
					AData.favorites[this.activity.day].activities.splice(index, 1);

					localStorage.favorites = JSON.stringify(AData.favorites);
				}
			},
			GetPotentialIndexOfFavorite: function() {
				var day = AData.favorites[this.activity.day];

				for(var a = 0; a < day.activities.length; ++a) {
					if(this.activity.start < day.activities[a].start) {
						return a;
					}
				}

				return day.activities.length;
			},
			GetIndexOfFavorite: function() {
				var day = AData.favorites[this.activity.day];

				for(var a = 0; a < day.activities.length; ++a) {
					if(day.activities[a].id === this.activity.id) {
						return a;
					}
				}

				return -1;
			},
		},
		Favorites: {
			element: document.getElementById("FavoritesPage"),
			showReloadButton: false,
			showAddFavoriteButton: false,
			showRemoveFavoriteButton: false,
			OnOpen: function() {
				this.element.innerHTML = "<h1 class=\"bg-orange\">Mitt schema</h1>";

				for(var d = 0; d < 7; ++d) {
					var day = AData.favorites[d];

					if(Date.now() < day.end) {
						this.element.innerHTML += "<div class=\"day\">" + day.name + " " + day.dayInMonth + " augusti</div>";

						for(var a = 0; a < day.activities.length; ++a) {
							var activity = day.activities[a];

							if(Date.now() < activity.end) {
								var startHour = 9 < activity.start.getHours() ? activity.start.getHours() : "0" + activity.start.getHours();

								var startMinute = 9 < activity.start.getMinutes() ? activity.start.getMinutes() : "0" + activity.start.getMinutes();

								var start = startHour + ":" + startMinute;

								var endHour = 9 < activity.end.getHours() ? activity.end.getHours() : "0" + activity.end.getHours();

								var endMinute = 9 < activity.end.getMinutes() ? activity.end.getMinutes() : "0" + activity.end.getMinutes();

								var end = endHour + ":" + endMinute;

								this.element.innerHTML +=
									"<a class=\"item\" onclick=\"javascript:APages.Open('Activity', " + activity.id + ");\">" +
										"<span class=\"title\">" + activity.name + "</span><br />" +
										"<span class=\"organizer\">" + activity.organizer + "</span><br />" +
										"<span class=\"time_and_location\">" + start + " - " + end + ", " + activity.location + "</span>" +
									"</a>"
								;
							}
						}
					}
				}
			},
		},
		Instagram: {
			element: document.getElementById("InstagramPage"),
			showReloadButton: true,
			OnOpen: function() {
				this.Load();
			},
			OnReload: function() {
				this.Load();
			},
			Load: function() {
				this.element.innerHTML = "<div class=\"loading\">Laddar bilder...</div>";

				var request = new XMLHttpRequest();

				request.page = this;

				request.onreadystatechange = function() {
					if(this.readyState === 4) {
						if(this.status === 200) {
							var data = JSON.parse(this.responseText);

							this.page.element.innerHTML = "";

							for(var i = 0; i < data.length; ++i) {
								var item = document.createElement("div");

								item.className = "item";

								item.innerHTML = "<img class=\"filler\" src=\"img/instagram/image.png\" /><img class=\"image\" src=\"" + data[i].image + "\" />";

								var image = item.childNodes[1];

								image.data = data[i];

								image.addEventListener(
									"load",
									function() {
										if(this.width < this.height) {
											this.style.width = "100%";

											this.style.top = -(this.height / this.width * 50 - 50) + "%";
										}
										else if(this.height < this.width) {
											this.style.height = "100%";

											this.style.left = -(this.width / this.height * 50 - 50) + "%";
										}
										else {
											this.style.width = "100%";

											this.style.height = "100%";
										}

										this.style.opacity = "1.0";

										this.style.transform = "scale(1.0)";
									}
								);

								image.addEventListener(
									"click",
									function() {
										AOverlay.Create(
											"<div class=\"image\">" +
												"<img src=\"" + this.data.image + "\" />" +
												"<p>Publicerad av <a href=\"http://instagram.com/_u/" + this.data.nick.substring(1) + "/\" target=\"_blank\">" + this.data.nick + "</a></p>" +
											"</div>"
										);
									}
								);

								this.page.element.appendChild(item);
							}
						}
					}
				};

				request.open("GET", "http://pride.castlegamejam.com/instagram.php", true);

				request.send();
			}
		},
		Map: {
			element: document.getElementById("MapPage"),
			showReloadButton: false,
			showAddFavoriteButton: false,
			showRemoveFavoriteButton: false,
			OnOpen: function() {

			},
		},
		Information: {
			element: document.getElementById("InformationPage"),
			showReloadButton: false,
			showAddFavoriteButton: false,
			showRemoveFavoriteButton: false,
			OnOpen: function() {

			},
		},
		Partners: {
			element: document.getElementById("PartnersPage"),
			showReloadButton: false,
			showAddFavoriteButton: false,
			showRemoveFavoriteButton: false,
			OnOpen: function() {

			},
		},
	},
};

APages = {};

APages.Open = function(pvId, pvParams) {
	if(AData.pages.current === null) {
		AData.pages.current = AUI.pages[pvId];

		AData.pages.current.element.style.opacity = "1.0";
	}
	else if(AData.pages.current.id !== pvId) {
		AData.pages.current.element.style.left = "-100%";

		AData.pages.history.push(AData.pages.current);

		AData.pages.current = AUI.pages[pvId];

		AData.pages.current.element.style.left = "0%";

		AData.pages.current.OnOpen(pvParams);

		AUI.backButton.style.left = 0 < AData.pages.history.length ? "0px" : "-64px";

		AUI.reloadButton.style.right = AData.pages.current.showReloadButton ? "0px" : "-64px";

		AUI.addFavoriteButton.style.right = AData.pages.current.showAddFavoriteButton ? "0px" : "-64px";

		AUI.removeFavoriteButton.style.right = AData.pages.current.showRemoveFavoriteButton ? "0px" : "-64px";
	}
};

APages.Back = function() {
	if(0 < AData.pages.history.length) {
		AData.pages.current.element.style.left = "100%";

		AData.pages.current = AData.pages.history.pop();

		AData.pages.current.element.style.left = "0%";

		AData.pages.current.OnOpen(null);

		AUI.backButton.style.left = 0 < AData.pages.history.length ? "0px" : "-64px";

		AUI.reloadButton.style.right = AData.pages.current.showReloadButton ? "0px" : "-64px";

		AUI.addFavoriteButton.style.right = AData.pages.current.showAddFavoriteButton ? "0px" : "-64px";

		AUI.removeFavoriteButton.style.right = AData.pages.current.showRemoveFavoriteButton ? "0px" : "-64px";
	}
};

APages.Reload = function() {
	AData.pages.current.OnReload();
};

APages.AddFavorite = function() {
	AData.pages.current.OnAddFavorite();
};

APages.RemoveFavorite = function() {
	AData.pages.current.OnRemoveFavorite();
};

AOverlay = {};

AOverlay.Create = function(pvHtml) {
	var overlay = document.createElement("div");

	overlay.className = "overlay";

	overlay.innerHTML = pvHtml;

	overlay.addEventListener(
		"click",
		function() {
			overlay.style.backgroundColor = "rgba(0, 0, 0, 0.0)";

			for(var i = 0; i < overlay.childNodes.length; ++i) {
				overlay.childNodes[i].style.transform = "scale(0.0)";
			}

			setTimeout(
				function(pvOverlay) {
					pvOverlay.parentNode.removeChild(pvOverlay);
				},
				400,
				overlay
			);
		}
	);

	document.body.appendChild(overlay);

	window.getComputedStyle(overlay).backgroundColor;

	overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

	for(var i = 0; i < overlay.childNodes.length; ++i) {
		window.getComputedStyle(overlay.childNodes[i]).transform;

		overlay.childNodes[i].style.transform = "scale(1.0)";
	}
};

var request = new XMLHttpRequest();

request.page = this;

request.onreadystatechange = function() {
	if(this.readyState === 4) {
		if(this.status === 200) {
			var data = JSON.parse(this.responseText);

			for(var a = 0; a < data.length; ++a) {
				var activity = data[a];

				activity.start = new Date(activity.start);

				activity.end = new Date(activity.end);

				AData.activities[activity.id] = activity;

				AData.days[activity.day].activities.push(activity);
			}

			setTimeout(function(){document.getElementById("Header").style.height="64px"}, 800);

			setTimeout(function(){APages.Open('Index')}, 1200);
		}
	}
};

request.open("GET", "http://pride.castlegamejam.com/program.json", true);

request.send();