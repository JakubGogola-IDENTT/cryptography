#include <stdio.h>
#include <stdlib.h>

struct glibc_rand_generator {
    int r[344];
    int incr;
};

void glibc_init (struct glibc_rand_generator *gen, int seed) {
    int i = 0;

    gen->r[0] = seed;

    for (i = 1; i < 31; i++) {
        gen->r[i] = (16807LL * gen->r[i - 1]) % 2147483647;

        if (gen->r[i] < 0) {
            gen->r[i] += 2147483647;
        }
    }

    for (i = 31; i < 34; i++) {
        gen->r[i] = gen->r[i - 31];
    }

    for (i = 34; i < 344; i++) {
        gen->r[i] = gen->r[i - 31] + gen->r[i - 3];
    }

    gen->incr = 344;
}

unsigned int glibc_next (struct glibc_rand_generator *gen) {
    unsigned int next = gen->r[gen->incr - 31] + gen->r[gen->incr - 3];

    gen->incr++;

    return (unsigned int) next >> 1;
}

int main() {
    struct glibc_rand_generator *gen;
    gen = malloc(sizeof(struct glibc_rand_generator));

    glibc_init(gen, 1);

    srand(1);

    for (int i = 0; i < 3; i++) {
        printf("Standard: %d\n", rand());
        printf("Predicted: %d\n\n", glibc_next(gen));
    }

    return 0;
}

