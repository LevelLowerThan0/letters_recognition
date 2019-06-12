import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import GridSearchCV

f = 'letter-recognition.data'

d = np.loadtxt(f, dtype='int', delimiter=',', converters={0: lambda s: ord(s) - ord('A')})

X = d[:, 1:]
y = np.zeros((20000, 26), dtype='int')

t = d[:, 0]

i = 0
for n in t:
    y[i][n] = 1
    i += 1

names = ["Nearest Neighbors", "Neural Net"]

classifiers = [
    KNeighborsClassifier(n_neighbors = 3),
    MLPClassifier(hidden_layer_sizes=(30, ), activation='logistic', learning_rate_init=0.05, max_iter=500, batch_size = 256)]
   # MLPClassifier(hidden_layer_sizes=(21, ))]

# parameter_space = {
#     'activation' : ['logistic', 'relu'],
#     'solver' : ['sgd', 'adam'],
#     'learning_rate_init' : [0.01, 0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3],
#     'max_iter' : [200, 300, 400, 500],
#     'batch_size' : [64, 128, 256, 512, 1024]
# }
#
# classifiers[1] = GridSearchCV(classifiers[1], parameter_space, n_jobs = 1, cv = 3)

X = MinMaxScaler().fit_transform(X)
X_train, X_test, y_train, y_test = \
    train_test_split(X, y, test_size=.2, random_state=42)

for name, clf in zip(names, classifiers):
    clf.fit(X_train, y_train)
    score = clf.score(X_test, y_test)
    print(name)
    print(score)

print(classifiers[1].loss_curve_)
c = []
for i in range(len(classifiers[1].loss_curve_)):
    c.append(i)
print(c)
#print('Best parameters found:\n', classifiers[1].best_params_)
#
# means = classifiers[1].cv_results_['mean_test_score']
# stds = classifiers[1].cv_results_['std_test_score']
# for mean, std, params in zip(means, stds, classifiers[1].cv_results_['params']):
#     print("%0.3f (+/-%0.03f) for %r" % (mean, std * 2, params))