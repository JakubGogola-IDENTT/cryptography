#include <iostream>
#include <cstdlib>
#include <bitset>

const int MAX = 100;
int r[MAX];

int predict(int idx) {
    r[idx] = r[idx - 31] + r[idx - 3] % 2147483648;

    return r[idx];
}

int main() {

    srand(1);

    unsigned int correct = 0;
    int expected, predicted;
    int i;

    for (i = 0; i < 34; i++) {
        r[i] = rand();
    }

    for (i = 0; i < MAX; i++) {
        expected = rand();
        predicted = predict(i);

        std::bitset<32> bits(expected ^ ~predicted);

        correct += bits.count();

        std::cout << ((double) correct) / (i + 1) / 32 << std::endl;

        if (predicted != expected) {
            r[i] = expected % 2147483648;
        }
    }
}
