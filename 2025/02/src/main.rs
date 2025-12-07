use std::fs;

fn get_ranges() -> Vec<(i64, i64)> {
    let source = fs::read_to_string("./input.txt").expect("Can't read file");

    source
        .split(',')
        .map(|range| {
            let mut parts = range.split('-');
            let start = parts.next().unwrap().parse().unwrap();
            let end = parts.next().unwrap().parse().unwrap();

            (start, end)
        })
        .collect()
}

fn solve_p1() -> i64 {
    let mut res = 0;

    let ranges = get_ranges();

    for (start, end) in ranges {
        let start_str = start.to_string();
        let end_str = end.to_string();

        if start_str.len() % 2 != 0 && start_str.len() == end_str.len() {
            continue;
        }

        for i in start..=end {
            let i_str = i.to_string();

            if i_str.len() % 2 != 0 {
                continue;
            }

            let left = &i_str[..i_str.len() / 2];
            let right = &i_str[i_str.len() / 2..];

            if left == right {
                res += i;
            }
        }
    }

    res
}

fn main() {
    println!("p1: {}", solve_p1());
}
