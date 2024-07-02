  # BEER DETECTION MODEL BY YOLOV9

  ## Project Description

  AIO-3KA_hackhcmc is a project for training the YOLOv9 model and deploying it via a web application

  ## Hackathon Category Selected

  Beer Detect - Utilizing technology to improve inspection and detection processes.

  ## Technology Stack

  - **Solution:** Object detection using YOLOv9
  - **Technological Infrastructure:** 
    - Python for training the YOLOv9 model
    - Flask for web deployment
  - **Technology Services:** 
    - Roboflow: A web allow to label dataset and deploy model
    - OpenCV: Library for computer vision tasks
    - PyTorch: Deep learning framework for training YOLOv9

  ## [Demo](https://dinhgia2106.github.io/Beer-detection-model-by-YOLOv9/)

  - Use version `1` for the most stable results.
  - Use version `2` for the most accurate results.
  - Use versions `3` and `4` to detect objects that are difficult to identify (not recommended because the accuracy is not high).
   
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

  - `index.html` - Main HTML file for the web application
  - `public` - Directory containing public assets
    - `css` - Custom stylesheets
    - `js` - Custom JavaScript files
  - `Yolov9_model_v1.ipynb` - Script to train model


  ## Acknowledgements

  - [Roboflow](https://roboflow.com/)
  - [OpenCV](https://opencv.org/)
  - [PyTorch](https://pytorch.org/)
  - [YOLOv9](https://github.com/SkalskiP/yolov9.git)

  ## Copyright 2024

  - Any issues related to copyright please contact me - [GrazT](https://github.com/dinhgia2106)
