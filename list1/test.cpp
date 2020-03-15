#include <cstdio>
#include <iostream>
#include <cstdlib>
#include <bitset>

int r[120];

int predict(int idx) {
    r[idx] = r[idx - 31] + r[idx - 3] % 2147483648; 

    return r[idx];
}

int main() {
    srand(1);
    int expected_value, predicted_value;
    int i;

    for (i = 0; i < 60; i++) {
        r[i] = rand();
    }

    unsigned int correct_count = 0;

    // test
    for (i = 0; i < 120; i++) {
        expected_value = rand();
        predicted_value = predict(i);

        auto bits = std::bitset<32> (expected_value ^ ~predicted_value);

        correct_count += bits.count();


        std::cout << ((double) correct_count)/(i + 1)/32 << std::endl;

    }

    printf("Correct: %d\n", correct_count);

}