// Generated by CoffeeScript 1.12.6
(function() {
  var Translator, defLang;

  defLang = "en";

  Translator = (function() {
    Translator.prototype.language = defLang;

    Translator.prototype.dictionary = {};

    function Translator(lang) {
      var ref, ref1, slang;
      slang = localStorage.getItem("app:language");
      this.language = (ref = (ref1 = slang != null ? slang : lang) != null ? ref1 : $("html").attr("lang")) != null ? ref : defLang;
    }

    Translator.prototype.addDictionary = function(dict, tr) {
      var lang, literal, text, texts;
      if (tr == null) {
        tr = false;
      }
      for (literal in dict) {
        texts = dict[literal];
        if (this.dictionary[literal] == null) {
          this.dictionary[literal] = {};
        }
        for (lang in texts) {
          text = texts[lang];
          this.dictionary[literal][lang] = text;
        }
      }
      if (tr) {
        return this.translate();
      }
    };

    Translator.prototype.translate = function(lang) {
      if (lang == null) {
        lang = this.language;
      }
      this.language = lang;
      $("html").attr("lang", lang);
      localStorage.setItem("app:language", lang);
      return $("[data-tr-text]").each((function(_this) {
        return function(i, element) {
          var el, literal, text;
          el = $(element);
          literal = el.attr("data-tr-text");
          text = _this.getLiteral(literal);
          if (text !== "") {
            return el.text(text);
          }
        };
      })(this));
    };

    Translator.prototype.translateText = function(text, lang1, lang2) {
      var literal, ref, texts;
      ref = this.dictionary;
      for (literal in ref) {
        texts = ref[literal];
        if (texts[lang1] === text && (texts[lang2] != null)) {
          return texts[lang2];
        }
      }
      return "";
    };

    Translator.prototype.getLiteral = function(literal, lang) {
      var ref, ref1, texts;
      if (lang == null) {
        lang = this.language;
      }
      texts = this.dictionary[literal];
      if (texts == null) {
        return "";
      }
      return (ref = (ref1 = texts[lang]) != null ? ref1 : texts[defLang]) != null ? ref : "";
    };

    Translator.createDictionary = function(dict, lang) {
      if (dict == null) {
        dict = {};
      }
      if (lang == null) {
        lang = defLang;
      }
      $("[data-tr-text]").each(function() {
        var el, literal, text, texts;
        el = $(this);
        literal = el.attr("data-tr-text");
        text = el.text();
        if (dict[literal] == null) {
          dict[literal] = {};
        }
        texts = dict[literal];
        if (texts[lang] == null) {
          return texts[lang] = text;
        }
      });
      return dict;
    };

    return Translator;

  })();

  window.Translator = Translator;

}).call(this);
