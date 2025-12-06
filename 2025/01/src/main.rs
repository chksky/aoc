use std::fs;

fn get_input() -> String {
    fs::read_to_string("./input.txt").expect("Can't read file")
}

fn solve_p1() -> i32 {
    let size = 100;

    let source = get_input();
    let turns = source.lines();

    let mut res = 0;
    let mut current = 50;
    for turn in turns {
        let dir = turn.chars().nth(0).unwrap();
        let count = turn[1..].parse::<i32>().unwrap();

        if dir == 'R' {
            current += count;
        } else {
            current -= count;
        }

        current = current % size;

        if current < 0 {
            current += size;
        }

        if current == 0 {
            res += 1;
        }
    }

    res
}

fn solve_p2() -> i32 {
    let size = 100;

    let source = get_input();
    let turns = source.lines();

    let mut res = 0;
    let mut current = 50;
    for turn in turns {
        let dir = turn.chars().nth(0).unwrap();
        let count = turn[1..].parse::<i32>().unwrap();

        let sign = if dir == 'L' { -1 } else { 1 };
        current += sign * count;
        if dir == 'L' {
          res += (current).abs() / size;
        } else {
          res += (current - 1) / size;
        }

        current = current % size;

        if current < 0 {
            if (current + count) % size != 0 {
                res += 1;
            }

            current += size;
        }

        if current == 0 {
            res += 1;
        }
    }

    res
}

fn main() {
    println!("p1: {}", solve_p1());
    println!("p1: {}", solve_p2());
}
