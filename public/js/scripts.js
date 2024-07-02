// Current model version
var currentModelVersion = 12;

$(function () {
    // Set default form values
    $('#model').val("detect-beer-8c3cm");
    $('#version').val("12");
    $('#api_key').val("Xeiw1baJjcr7i65JdxIW");

    // Setup button listeners
    setupButtonListeners();
});

// Function to update the model version
function updateVersion(newVersion) {
    currentModelVersion = newVersion;
    console.log("Version updated to: " + currentModelVersion);
}

// Function to handle inference
function performInference() {
    $('#output').html("Inferring...");
    $("#resultContainer").show();
    $('html').scrollTop(900);

    getSettingsFromForm(function (settings) {
        settings.error = function (xhr) {
            $('#output').html("").append([
                "Error loading response.",
                "",
                "Check your API key, model, version,",
                "and other parameters",
                "then try again."
            ].join("\n"));
        };

        $.ajax(settings).then(function (response) {
            console.log("Response received:", response);

            if (settings.format === "json") {
                var pretty = $('<pre>');
                var formatted = JSON.stringify(response, null, 4);
                pretty.html(formatted);
                $('#output').html("").append(pretty);
                $('html').scrollTop(900);
            } else {
                var arrayBufferView = new Uint8Array(response);
                var blob = new Blob([arrayBufferView], { 'type': 'image/jpeg' });
                var base64image = window.URL.createObjectURL(blob);

                var img = new Image();
                img.onload = function () {
                    // Resize the image before displaying
                    resizeImage(base64image).then(function (resizedBase64) {
                        var resizedImg = $('<img/>');
                        resizedImg.get(0).onload = function () {
                            $('html').scrollTop(900);
                        };
                        resizedImg.attr('src', resizedBase64);
                        $('#output').html("").append(resizedImg);
                    });
                };
                img.src = base64image;

                // Fetch the JSON representation of the response for counting
                $.ajax({
                    url: settings.url + "&format=json",
                    method: "POST",
                    data: settings.data,
                    success: function (jsonResponse) {
                        var drinkerCount = 0;
                        if (jsonResponse && jsonResponse.predictions) {
                            drinkerCount = jsonResponse.predictions.filter(function (prediction) {
                                return prediction.class === "drinker";
                            }).length;
                        }

                        console.log("Number of 'drinker' classes detected:", drinkerCount);
                        var resultText = "Number of 'drinker' classes detected: " + drinkerCount;
                        var versionText = "This is result of using model version: " + (currentModelVersion - 11);
                        $('#output').prepend(versionText + "<br/>");
                        $('#output').prepend(resultText + "<br/>");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("Error fetching JSON response:", textStatus, errorThrown);
                        $('#output').prepend("Error fetching JSON response. Number of 'drinker' classes detected: 0<br/>");
                    }
                });
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX call failed:", textStatus, errorThrown);
            $('#output').html("Error occurred during inference.");
        });
    });
}

// Function to resize image
function resizeImage(base64Str) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = base64Str;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            var MAX_WIDTH = 800; // Resize width
            var MAX_HEIGHT = 800; // Resize height
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL('image/jpeg', 0.8)); // Reduce quality to 80%
        };
        img.onerror = function (error) {
            reject(error);
        };
    });
}

// Retrieve default values from localStorage
function retrieveDefaultValuesFromLocalStorage() {
    try {
        var apiKey = localStorage.getItem("rf.api_key");
        var model = localStorage.getItem("rf.model");
        var format = localStorage.getItem("rf.format");

        if (apiKey) $('#api_key').val(apiKey);
        if (model) $('#model').val(model);
        if (format) $('#format').val(format);
    } catch (e) {
        // localStorage disabled
    }

    $('#model').change(function () {
        localStorage.setItem('rf.model', $(this).val());
    });

    $('#api_key').change(function () {
        localStorage.setItem('rf.api_key', $(this).val());
    });

    $('#format').change(function () {
        localStorage.setItem('rf.format', $(this).val());
    });
}

// Setup listeners for form buttons
function setupButtonListeners() {
    // Run inference when the form is submitted
    $('#inputForm').submit(function () {
        performInference();
        return false;
    });

    // Toggle button active state and show proper input fields
    $('.bttn').click(function () {
        $(this).parent().find('.bttn').removeClass('active');
        $(this).addClass('active');

        if ($('#computerButton').hasClass('active')) {
            $('#fileSelectionContainer').show();
            $('#urlContainer').hide();
        } else {
            $('#fileSelectionContainer').hide();
            $('#urlContainer').show();
        }

        if ($('#jsonButton').hasClass('active')) {
            $('#imageOptions').hide();
        } else {
            $('#imageOptions').show();
        }

        return false;
    });

    // Trigger file input when mock button is clicked
    $('#fileMock').click(function () {
        $('#file').click();
    });

    // Update filename display when a file is selected
    $("#file").change(function () {
        var path = $(this).val().replace(/\\/g, "/");
        var parts = path.split("/");
        var filename = parts.pop();
        $('#fileName').val(filename);
        $('#fileSelectedMsg').show();
    });

    // Show confirmation message when URL is entered
    $("#url").on("input", function () {
        if ($(this).val().length > 0) {
            $('#urlEnteredMsg').show();
        } else {
            $('#urlEnteredMsg').hide();
        }
    });
}

// Get settings from form inputs
function getSettingsFromForm(callback) {
    var settings = {
        method: "POST",
    };

    var urlParts = [
        "https://detect.roboflow.com/",
        $('#model').val(),
        "/",
        currentModelVersion,
        "?api_key=" + $('#api_key').val()
    ];

    var classes = $('#classes').val();
    if (classes) urlParts.push("&classes=" + classes);

    var confidence = $('#confidence').val();
    if (confidence) urlParts.push("&confidence=" + confidence);

    var overlap = $('#overlap').val();
    if (overlap) urlParts.push("&overlap=" + overlap);

    var format = $('#format .active').attr('data-value');
    urlParts.push("&format=" + format);
    settings.format = format;

    if (format === "image") {
        var labels = $('#labels .active').attr('data-value');
        if (labels) urlParts.push("&labels=on");

        var stroke = $('#stroke .active').attr('data-value');
        if (stroke) urlParts.push("&stroke=" + stroke);

        settings.xhr = function () {
            var xhrOverride = new XMLHttpRequest();
            xhrOverride.responseType = 'arraybuffer';
            return xhrOverride;
        }
    }

    var method = $('#method .active').attr('data-value');
    if (method === "upload") {
        var file = $('#file').get(0).files && $('#file').get(0).files.item(0);
        if (!file) return alert("Please select a file.");

        getBase64fromFile(file).then(function (base64image) {
            settings.url = urlParts.join("");
            settings.data = base64image;

            console.log(settings);
            callback(settings);
        });
    } else {
        var url = $('#url').val();
        if (!url) return alert("Please enter an image URL");

        urlParts.push("&image=" + encodeURIComponent(url));

        settings.url = urlParts.join("");
        console.log(settings);
        callback(settings);
    }
}

// Convert file to base64
function getBase64fromFile(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    });
}
