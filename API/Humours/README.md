## Offensive classification and Dataset

Automatic humor detection has interesting use cases in modern technologies, such as chatbots and personal assistants.

We used dataset from kaggle for humour detection. Link : https://www.kaggle.com/moradnejad/200k-short-texts-for-humor-detection

## Installation

Clone the repository
```bash
git clone https://github.com/Gargee-srivastava/RK304_Techclans.git
cd RK304_Techclans/API/Humours
```

Download the offensive classification dataset from [HASOC](https://hasocfire.github.io/hasoc/2019/dataset.html) and place in `RK304_Techclans/API/Humours` folder

Create Conda Environment
```bash
conda create -n <env_name> python=3.6
conda activate <env_name>
```

Install the dependencies in conda environment:
```python
pip install -r requirements.txt
```

## Usage

To train the model, use `humour.ipynb` file to train it.

To run the deployment server 

```python
python app.py
```

## Approach
- Used Bert to classify this problem.
- Optimizer Used : Adam
- Loss Function Used : Binary Cross Entropy.
- Categorised as :

    - 0 -->> Not Humourous
    - 1 -->> Humourous