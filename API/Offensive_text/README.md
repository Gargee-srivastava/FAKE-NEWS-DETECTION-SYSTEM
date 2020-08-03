## Offensive classification and Dataset

Offensive language such as insulting, hurtful, derogatory or obscene content directed from one person to another person and open for others undermines objective discussions.

[HASOC](https://hasocfire.github.io/hasoc/2019/dataset.html) dataset focus on Hate speech and Offensive language identification offered for English

## Installation

Clone the repository
```bash
git clone https://github.com/Gargee-srivastava/RK304_Techclans.git
cd RK304_Techclans/API/Offensive_text
```

Download the offensive classification dataset from [HASOC](https://hasocfire.github.io/hasoc/2019/dataset.html) and place in `RK304_Techclans/API/Offensive_text` folder

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

To train the model, use `Offensive.ipynb` file to train it.

<!-- To run the deployment server 

```python
python app.py
``` -->

## Approach
- Used Bert to classify this problem.
- Optimizer Used : Adam
- Loss Function Used : Binary Cross Entropy.
- Categorised as :

    - 0 -->> Non Hate-Offensive
    - 1 -->> Hate and Offensive