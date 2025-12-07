use std::fs;

fn get_ranges() -> Vec<(usize, usize)> {
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

fn solve_p1() -> usize {
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

fn solve_p2() -> usize {
    let mut res = 0;

    let ranges = get_ranges();

    for (start, end) in ranges {
        let start_str = start.to_string();
        let end_str = end.to_string();

        if start_str.len() == 1 && end_str.len() == 1 {
            continue;
        }

        for i in start..=end {
            let i_str = i.to_string();

            for size in 1..=i_str.len() / 2 {
                let parts: Vec<String> = i_str
                    .chars()
                    .collect::<Vec<char>>()
                    .chunks(size)
                    .map(|chunk| chunk.iter().collect())
                    .collect();

                let all_same = parts.iter().all(|part| part == &parts[0]);

                if all_same {
                    res += i;
                    break;
                }
            }
        }
    }

    res
}

fn main() {
    println!("p1: {}", solve_p1());
    println!("p2: {}", solve_p2());
}
