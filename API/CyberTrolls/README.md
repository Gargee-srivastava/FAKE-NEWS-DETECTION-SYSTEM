## Cyber trolls classification and Dataset

This dataset consists of tweets classified as aggressive or not to help fight trolls.

We used dataset from kaggle for cyber trolls detection. Link : https://www.kaggle.com/dataturks/dataset-for-detection-of-cybertrolls

## Installation

Clone the repository
```bash
git clone https://github.com/Gargee-srivastava/RK304_Techclans.git
cd RK304_Techclans/API/Humours
```

Download the offensive classification dataset from [Cyber trolls](https://www.kaggle.com/dataturks/dataset-for-detection-of-cybertrolls) and place in `RK304_Techclans/API/CyberTrolls` folder

Create Conda Environment
```bash
conda create -n <env_name> python=3.6
conda activate <env_name>
```

Installing pytorch with cuda9.0
```python
conda install pytorch==1.1.0 torchvision==0.3.0 cudatoolkit=9.0 -c pytorch
```

Install other dependencies in conda environment:
```python
pip install -r requirements.txt
```

## Usage

So, to train the model run this command:
```python
python train.py
```

To run the deployment server 

```python
python app.py
```

## Approach
- Used Bert to classify this problem in pytorch.
- Optimizer Used : Adam
- Loss Function Used : Binary Cross Entropy.
- Categorised as :

    - 0 -->> Not a troll
    - 1 -->> Troll