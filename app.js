// Slow solution
// Not use previous computed value
function getSlowAverages(nums, k) {
    const elementCount = k * 2 + 1;

    if (elementCount > nums.length) return nums.map(_ => -1);

    let center = 0;

    const result = [];

    while (center < nums.length) {
        let point = center - k;
        let end = center + k;
        let sum = 0;

        let isUndefined = false;

        while (point <= end) {
            const num = nums[point];

            if (num === undefined) {
                isUndefined = true;
                break;
            }

            sum += num;

            point++;
        }

        if (isUndefined) {
            result.push(-1);
        } else {
            result.push(Math.floor(sum / elementCount));
        }


        center++;
    }

    return result;
}

// Fast solution
// Use previous computed value
function getFastAverages({ nums, k }) {
    const elementCount = k * 2 + 1;

    if (elementCount > nums.length) return nums.map(_ => -1);

    let center = 0;

    const result = [];

    while (center < nums.length) {
        let point = center - k;
        let end = center + k;
        let sum = 0;

        let isUndefined = false;

        if (center < k + 1) {
            while (point <= end) {
                const num = nums[point];

                if (num === undefined) {
                    isUndefined = true;
                    break;
                }

                sum += num;

                point++;
            }
        } else {
            const newValue = nums[end];

            if (newValue === undefined) {
                isUndefined = true;
            } else {
                sum = result.at(-1) - nums[point - 1] + newValue;
            }
        }



        if (isUndefined) {
            result.push(-1);
        } else {
            result.push(sum);
        }


        center++;
    }

    return result.map(item => Math.floor(item / elementCount));
}


console.log(`test 1`, getFastAverages({ nums: [7,4,3,9,1,8,5,2,6], k: 3 }));
console.log(`test 2`, getFastAverages({ nums: [100000], k: 0 }));
console.log(`test 3`, getFastAverages({ nums: [8], k: 100000 }));