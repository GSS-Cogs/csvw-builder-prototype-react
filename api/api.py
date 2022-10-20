from stat import filemode
import time
from csvcubed.cli.entrypoint import entry_point, version, build_command, build
from flask import Flask, request, send_file

from os import listdir
import os
from os.path import isfile, join
import pathlib

import json
from pathlib import Path

UPLOAD_FOLDER = './'
ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/version')
async def get_current_version():
    # thread = threading.Thread(target=entry_point, args=([['version']]))
    # thread.start()
    # entry_point(
    #     ['build', '/Users/rhysstromaine/Documents/sweden_at_eurovision_no_missing.csv'])
    print('version here 1')
    build(Path("/Users/rhysstromaine/Documents/sweden_at_eurovision_no_missing.csv"))
    print('version here 2')
    print(pathlib.Path().resolve())
    onlyfiles = [f for f in listdir('./out')]
    onlyfiles = ', '.join(onlyfiles)
    return {'version': 'done'}


def handler(signum, frame):
    print("Forever is over!")
    raise Exception("end of time")


@app.route('/download/<filename>/<folder>', methods=['GET'])
def download_file(filename, folder):
    path = os.path.join(app.config['UPLOAD_FOLDER'],
                        'out/', folder+'/', filename)
    print(path)
    if os.path.isfile(path):
        return send_file(path)
    return ''


@app.route('/build', methods=['GET', 'POST'])
def build_csvw():
    # file = request.args.get('data')
    # try:
    if request.method == 'POST':
        # if 'file' not in request.files:
        #     print('failed on file')
        #     return request.url
        file = request.files['file']
        filename = request.form.getlist('filename')[0]
        configJson = json.loads(request.form.getlist('config')[0])

        # if file.filename == '':
        #     flash('No selected file')
        #     return redirect(request.url)
        if file:
            path = os.path.join(
                app.config['UPLOAD_FOLDER'], 'out/', filename + '/')
            if (os.path.exists(path)):
                deleteFilesFromDir(path)
            else:
                os.mkdir(path)
            file.save(os.path.join(path, filename + '.csv'))
            with open(os.path.join(path,  'qube-config.json'), 'w') as outfile:
                json.dump(configJson, outfile, indent=4)
                # Path(os.path.join(app.config['UPLOAD_FOLDER'], 'qube-config.json'))
                #  /Users/rhysstromaine/Repos/csvw-builder-prototype-react/api/sweden_at_eurovision_no_missing.csv

            build(
                Path(os.path.join(
                    path, filename + '.csv')), Path(os.path.join(path, 'qube-config.json')), Path(path))
            onlyfiles = [f for f in listdir(path)]
            # onlyfiles = ', '.join(onlyfiles)
            print({'build': onlyfiles})
            return {'build': onlyfiles}
    # except NameError:
    #     print(NameError)
    return {'build': 'failed'}


def deleteFilesFromDir(path):

    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        print(file_path)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            # elif os.path.isdir(file_path):
            #     shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))
