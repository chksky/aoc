use std::fs;

fn get_input() -> String {
    fs::read_to_string("./input.txt").expect("Can't read file")
}

fn solve_p1() {
    let size = 100;

    let source = get_input();
    let turns = source.lines();

    let mut res = 0;
    let mut current = 50;
    for turn in turns {
        let dir = turn.chars().nth(0).unwrap();
        let count = turn
            .chars()
            .skip(1)
            .collect::<String>()
            .parse::<i32>()
            .unwrap();

        if dir == 'R' {
            current += count;
        } else {
            current -= count;
        }

        current = current % size;

        if current < 0 {
            current = size + current;
        }

        if current == 0 {
            res += 1;
        }
    }

    println!("result for p1: {}", res);
}

fn main() {
    solve_p1();
}
