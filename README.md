# Time-Picker-WebComponent

## Introduction

Welcome to the TimePicker Web Component! This component is a reusable custom element designed to allow users to easily select and format a time input (hour and minute). This component ensures proper validation and formatting of the input values and provides a user-friendly interface with an option to confirm or cancel the selection.

## Key Features

- **Modern UI:** Enjoy a clean and modern user interface.
- **Time Selection:** Allows users to easily select hours and minutes.
- **Validation:** Ensures that the hour and minute inputs are within valid ranges.
- **Auto Formatting:** Formats the input values to always display two digits.
- **Simple Integration:** Easily integrate into any web application as a custom HTML element.
- **Custom Events:** Dispatches a custom event with the selected time values upon confirmation.

## Component Structure

The TimePicker component is structured as follows:

- **HTML Template:** Defines the layout of the time picker, including input fields for hours and minutes, and action buttons.
- **CSS Styling:** Provides visual enhancements for the time picker interface.
- **JavaScript Logic:** Implements the core functionality of the time picker, handling user inputs, validation, and events.

## Implementation Details

### HTML Structure

The TimePicker component uses HTML to define its structure, including elements such as input fields for hours and minutes, and buttons for confirming or canceling the selection.

### CSS Styling

Custom CSS styling enhances the visual appearance of the time picker, ensuring a pleasant user experience.

### JavaScript Functionality

JavaScript handles the interactive aspects of the time picker, such as capturing user inputs, validating time values, formatting inputs, and dispatching custom events.

## Usage

To use the TimePicker component, insert the <time-picker> tag in your HTML file where you want the time picker to appear. You can use it in different ways:

- **Without Default Values:** The component will initialize with default values (00:00).
    ```html
    <time-picker></time-picker>
    ```

- **With Default Values:** You can set default hour and minute values.
    ```html
    <time-picker hour="12" minute="30"></time-picker>
    ```

### Example usage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Time Picker Example</title>
</head>
<body>
    <!-- Without default values -->
    <time-picker></time-picker>
    
    <!-- With default values -->
    <time-picker hour="12" minute="30"></time-picker>

    <script src="path/to/time-picker.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('time-picker').forEach((picker) => {
                picker.addEventListener('time-selected', (event) => {
                    console.log('Selected time:', event.detail);
                });
            });
        });
    </script>
</body>
</html>

```