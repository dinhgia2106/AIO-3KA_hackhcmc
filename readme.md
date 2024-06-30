# AIO-3KA_hackhcmc

Product of team AIO_3KA

## Project Description

AIO-3KA_hackhcmc is a project for training the YOLOv9 model and deploying it via a web application

## Hackathon Category Selected

Heineken Detect - Utilizing technology to improve inspection and detection processes.

## Technology Stack

- **Solution:** Object detection using YOLOv9
- **Technological Infrastructure:** 
  - Python for training the YOLOv9 model
  - Flask for web deployment
- **Technology Services:** 
  - Roboflow: A web allow to label dataset and deploy model
  - OpenCV: Library for computer vision tasks
  - PyTorch: Deep learning framework for training YOLOv9

## Demo
- [Model Demo - Image](https://dinhgia2106.github.io/AIO-3KA_hackhcmc/)
- [Model Demo - Video (Realtime)]([https://dinhgia2106.github.io/AIO-3KA_hackhcmc/](https://github.com/dinhgia2106/AIO-3KA_hackhcmc/assets/115169101/555957cb-3707-40a7-a5b2-3225dbee5332))
<space><space>
  ![image](https://github.com/dinhgia2106/AIO-3KA_hackhcmc/assets/115169101/555957cb-3707-40a7-a5b2-3225dbee5332)


## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2. Navigate to the project directory:
    ```bash
    cd AIO-3KA_hackhcmc
    ```
3. Run following file to train:
    ```bash
    Yolov9_model_v1.ipynb
    ```
4. Replace your model, version, api_key in ```scripts.js```:
    ```bash
    $('#model').val("YOUR MODEL NAME");
    $('#version').val("YOUR MODEL VERSION");
    $('#api_key').val("YOUR API");    ```

## Usage

The main entry point of the application is the `Yolov9_model_v1.ipynb` for model training. Ensure that all dependencies are installed and correctly referenced.

## Project Structure

- `.git` - Version control directory
- `.gitignore` - Git ignore file
- `index.html` - Main HTML file for the web application
- `public` - Directory containing public assets
  - `css` - Custom stylesheets
  - `js` - Custom JavaScript files
- `train.py` - Script for training the YOLOv9 model
- `app.py` - Flask application script for web deployment
- `Yolov9_model_v1.ipynb` - Script to train model

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

- [Roboflow](https://roboflow.com/)
- [OpenCV](https://opencv.org/)
- [PyTorch](https://pytorch.org/)
- [YOLOv9](https://github.com/SkalskiP/yolov9.git)
