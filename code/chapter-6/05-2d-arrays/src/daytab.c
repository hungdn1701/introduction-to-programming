/* daytab.c - day_of_year and month_day of K&R 5.7: a two-dimensional table
 * with one row for common years and one for leap years. The leap-year
 * expression (K&R 2.5) selects the row. */
#include <stdio.h>

static char daytab[2][13] = {
    {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
    {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
};

/* day_of_year: set day of year from month & day */
int day_of_year(int year, int month, int day)
{
    int leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    for (int i = 1; i < month; i++)
        day += daytab[leap][i];
    return day;
}

/* month_day: set month, day from day of year */
void month_day(int year, int yearday, int *pmonth, int *pday)
{
    int leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    int i;
    for (i = 1; yearday > daytab[leap][i]; i++)
        yearday -= daytab[leap][i];
    *pmonth = i;
    *pday = yearday;
}

int main(void)
{
    int month, day;

    printf("1/3/2024 is day %d\n", day_of_year(2024, 3, 1));
    printf("1/3/2026 is day %d\n", day_of_year(2026, 3, 1));
    month_day(2026, 256, &month, &day);
    printf("day 256 of 2026 is %d/%d\n", day, month);
    return 0;
}
