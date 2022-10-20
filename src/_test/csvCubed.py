from csvcubed.cli.entrypoint import entry_point, version, build_command, build
from csvcubed.cli.build import build
from os.path import exists
from pathlib import Path

print(exists('/Users/rhysstromaine/Documents/sweden_at_eurovision_no_missing.csv'))
# print(entry_point(
#     ['build', '/Users/rhysstromaine/Documents/sweden_at_eurovision_no_missing.csv']))
# entry_point('-h')
print(build(Path("/Users/rhysstromaine/Documents/sweden_at_eurovision_no_missing.csv")))
# localhost:3000/a5a06f85-1b5d-4ae5-8e54-c8cd3df32414
# print(entry_point('version'))

# print(entry_point(build_command(
#     '/Users/rhysstromaine/Documents/sweden_at_eurovision_no_missing.csv')))
# build('/Users/rhysstromaine/Documents/sweden_at_eurovision_no_missing.csv')
