function getDomain() {
	var domain = window.location.hostname.split(".")
	for (let i = 0; i < domain.length; i++) {
		if (domain[i] == "pages") {
			if (domain[i + 1] == "dev") {
				location.replace("https://ocaligraph.com/")
			}
		}
	}
}

function consoleBanner() {
	console.clear()
	if (window.console || 'console' in window) {
		setTimeout(console.clear())
		setTimeout(console.log("\n\n                  _nnnn_ \n                 dGGGGMMb \n                @p~qp~~qMb \n                M|@||@) M| \n                @,----.JM| \n               JS^\\__/  qKL \n              dZP        qKRb \n             dZP          qKKb \n            fZP            SMMb \n            HZM            MMMM \n            FqM            MMMM \n          __| '.        |\\dS'qML \n          |    `.       | `' \\Zq \n         _)      \\.___.,|     .' \n         \\____   )MMMMMP|   .' \n              `-'       `--' \n\n        OCaligraph, \n          https://ocaligraph.com \n\n"))
		setTimeout(console.log.bind(console, '%cAttention!!!', 'color:#f0b734; font-size:40px;'));
		setTimeout(console.log.bind(console, '%cCette fonction du navigateur est rÃ©servÃ©e aux dÃ©veloppeurs. Veuillez ne pas copier-coller de code ou exÃ©cuter de scripts ici. Cela pourrait compromettre votre navigateur.', 'color:#f7d3fd; font-size:16px; font-weight: bold;'));
		setTimeout(console.log.bind(console, '%cPour plus d\'informations, http://en.wikipedia.org/wiki/Self-XSS', 'color:#f7d3fd; font-size:16px; font-weight: bold;'));
	}
}

//getDomain()
consoleBanner()