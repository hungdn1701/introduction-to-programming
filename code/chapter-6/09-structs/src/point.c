/* point.c - struct point and struct rect of K&R 6.1-6.2: makepoint,
 * addpoint, ptinrect; a structure is passed by value, so changing it needs a
 * pointer (operator ->). typedef gives the type a short name (K&R 6.7). */
#include <stdio.h>

struct point {
    int x;
    int y;
};

struct rect {
    struct point pt1;
    struct point pt2;
};

typedef struct point Point;

/* makepoint: make a point from x and y components */
Point makepoint(int x, int y)
{
    Point temp;

    temp.x = x;
    temp.y = y;
    return temp;
}

/* addpoint: add two points */
Point addpoint(Point p1, Point p2)
{
    p1.x += p2.x;
    p1.y += p2.y;
    return p1;
}

/* ptinrect: return 1 if p in r, 0 if not */
int ptinrect(Point p, struct rect r)
{
    return p.x >= r.pt1.x && p.x < r.pt2.x
        && p.y >= r.pt1.y && p.y < r.pt2.y;
}

void move_copy(Point p, int dx)     /* changes a copy only */
{
    p.x += dx;
}

void move(Point *pp, int dx)        /* changes the caller's point */
{
    pp->x += dx;
}

int main(void)
{
    struct rect screen;
    Point middle, p;

    screen.pt1 = makepoint(0, 0);
    screen.pt2 = makepoint(640, 400);
    middle = makepoint((screen.pt1.x + screen.pt2.x) / 2,
                       (screen.pt1.y + screen.pt2.y) / 2);
    printf("middle = (%d, %d)\n", middle.x, middle.y);

    p = addpoint(makepoint(1, 2), makepoint(3, 4));
    printf("addpoint((1, 2), (3, 4)) = (%d, %d)\n", p.x, p.y);
    printf("ptinrect((100, 100), screen) = %d\n", ptinrect(makepoint(100, 100), screen));
    printf("ptinrect((700, 100), screen) = %d\n", ptinrect(makepoint(700, 100), screen));

    p = makepoint(1, 2);
    move_copy(p, 10);
    printf("after move_copy(p, 10): p = (%d, %d)\n", p.x, p.y);
    move(&p, 10);
    printf("after move(&p, 10)    : p = (%d, %d)\n", p.x, p.y);
    return 0;
}
