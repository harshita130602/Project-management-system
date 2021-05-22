import requests
import colorama
import json

colorama.init()

OK = colorama.Back.GREEN + "OK" + colorama.Back.RESET
FAIL = colorama.Back.RED + "FAIL" + colorama.Back.RESET

URL = "http://localhost:4000/projects"


def run_test_case(case):
    expect_pass = case.pop("success")

    res = requests.post(URL, json=case)

    print("\n\nCase No.:", index)
    print(json.dumps(case, indent=2))
    print("Expected:", OK if expect_pass else FAIL)
    print("Actual:   ", end="")

    if res.status_code == 200:
        print(OK)
        actual_pass = True
    else:
        print(FAIL, res.json()['message'])
        actual_pass = False

    return expect_pass == actual_pass


with open("test-cases.json", "r") as f:
    test_cases = json.load(f)

tests_passed = 0
for (index, case) in enumerate(test_cases):
    if run_test_case(case):
        tests_passed += 1

print(f"\n\n{tests_passed}/{len(test_cases)} tests passed")
