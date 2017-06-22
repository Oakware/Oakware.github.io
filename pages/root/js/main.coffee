translator = null
languages  = ["en", "uk", "ru"]

$(document).ready ->
	$(".button-collapse").sideNav()

	translator = new Translator(getBrowserLanguage())

	jQuery.getJSON "js/translator/literals.json", (dict) ->
		translator.addDictionary dict, true
		# console.log JSON.stringify Translator.createDictionary(dict)

	$("#lang-dropdown a").click ->
		translator.translate $(this).attr("data-lang")

getBrowserLanguage = ->
	lang  = "en"
	blang = navigator.language[0...2]
	ind   = languages.indexOf blang
	if ind >= 0 then lang = languages[ind]
	return lang
