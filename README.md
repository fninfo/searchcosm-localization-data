# Субмодуль с данными локализации бота для поиска косметических предметов Fortnite

**Репозиторий содержит данные для трех подсистем: получения значения по ключу, поиска ключа в массиве значений и получения сопутствующих языку данных**

Под кодом языка подразумевается код по стандарту ISO 639-1 (две буквы).
Для языков игры сделано исключение: они могут принимать значения из списка
> "ru", "en", "ar", "de", "es", "es-419", "fr", "it", "ja", "ko", "pl", "pt-BR", "tr", "zh-CN", "zh-Hant"

## loc/ - значение по ключу
Используется для вывода статических и динамических строк.

Каждый JSON-файл в данной папке представляет язык интерфейса. Языков интерфейса может быть больше чем игровых языков. Язык интерфейса либо задается пользователем, либо автоматически выбирается на основе языка его системы.

Строки отсюда прекомпилируются как шаблонные строки по стандарту ES6: ${значение}. Бот передаст соответствующие параметры при выводе строки. Не проводите вычисления и проверки внутри шаблона! Список параметров можно узнать, посмотрев на уже существующие строки.

Вложенные объекты конвертируются в представление с dot-нотацией.

## resolve/ - поиск ключа в массиве значений
Используется для превращения вводимых строк во внутреннее представление и для создания алиасов.

Каждый JSON-файл представляет пространство имен, в котором выполняется поиск. При этом по языкам разделения нет. Это продуманное решение: результаты поиска не должны меняться в зависимости от текущего языка. Объект представлен набором ключей и массивами строк.

Структура объекта:
```javascript
{
	"ключ": ["массив", "значений"],
	"ключ 2": ["еще", "один", "набор"],
}
```

Добавляйте в каждый файл столько значений, сколько нужно. Производительность не пострадает. Пользователи смогут использовать значения вместо ключа. Сам ключ при этом в массив добавлять не надо - бот, для удобства, сделает это автоматически.

При форматировании, пожалуйста, оставляйте между полями пустую строку. Массивы разделяйте так, чтобы каждый новый язык после первого начинался с новой строки и двойного символа табуляции.

**Значения не должны повторяться внутри одного файла!**
И еще одна важная деталь: в значениях внутри searchParam.json не допускаются пробелы и знаки равно. Это связано с тем, что параметры при поиске отделяются данными символами от значений. В остальных файлах использование пробелов приветствуется, если они полезны пользователям.

## lang-data.json - привязки данных к языку
Используется для определения предпочитаемых параметров в соответствии с языком клиента.

Структура объекта:
```javascript
"код языка клиента": {
		"gameLanguage": "код языка игры",
		"languageName": "название языка на нем самом",
		"gameLanguageName": "название языка игры на предоставленном языке",
		"timezone": "Часовой пояс в формате CTIME",
		"timezoneName": "сокр. имя час. пояса после даты"
	},
"код языка клиента 2": {
		"gameLanguage": "код языка игры",
		"languageName": "название языка на нем самом 2",
		"gameLanguageName": "название языка игры на предоставленном языке 2",
		"timezone": "Часовой пояс в формате CTIME 2",
		"timezoneName": "сокр. имя час. пояса после даты 2"
}
```

Очевидно, разным языкам клиента в lang-data.json могут соответствовать одинаковые языки игры.