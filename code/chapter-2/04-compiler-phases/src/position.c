/* The statement of the Dragon book, section 1.2: position = initial + rate * 60 */
double position, initial, rate;

void update(void)
{
    position = initial + rate * 60;
}
