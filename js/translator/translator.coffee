defLang = "en"

class Translator
	language: defLang
	dictionary: {}

	constructor: (lang) ->
		slang = localStorage.getItem "app:language"
		@language = slang ? lang ? $("html").attr("lang") ? defLang

	addDictionary: (dict, tr = false) ->
		for literal, texts of dict
			if not @dictionary[literal]?	# create literal
				@dictionary[literal] = {}
			for lang, text of texts			# add texts
				@dictionary[literal][lang] = text
		if tr then @translate()				# translate new literals

	translate: (lang = @language) ->
		@language = lang					# set language
		$("html").attr "lang", lang
		localStorage.setItem "app:language", lang

		$("[data-tr-text]").each (i, element) =>	# translate each element
			el      = $(element)
			literal = el.attr("data-tr-text")
			text    = @getLiteral literal
			if text != "" then el.text text

	translateText: (text, lang1, lang2) ->
		for literal, texts of @dictionary	# find literal with text
			if texts[lang1] == text and texts[lang2]?
				return texts[lang2]
		return ""

	getLiteral: (literal, lang = @language) ->
		texts = @dictionary[literal]
		if not texts? then return ""		# return "" if literal does not exist
		texts[lang] ? texts[defLang] ? ""	# return lang text

	@createDictionary: (dict = {}, lang = defLang) ->
		$("[data-tr-text]").each ->		# append each literal
			el = $(this)
			literal = el.attr("data-tr-text")
			text    = el.text()

			if not dict[literal]?
				dict[literal] = {}

			texts = dict[literal]
			if not texts[lang]?
				texts[lang] = text
		return dict

	# import to global scope
window.Translator = Translator
