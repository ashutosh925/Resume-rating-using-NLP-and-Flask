import os
import re
from collections import Counter
from io import StringIO
from pathlib import Path

import pandas as pd
import spacy
from flask import Flask, render_template, request, url_for, redirect, send_file
from gensim.models import Word2Vec
from spacy.matcher import PhraseMatcher
from werkzeug.utils import secure_filename

#from . import
from resume import *
from BlackBoxCode  import Engine
nlp = spacy.load('en_core_web_lg')

app = Flask(__name__)

app.secret_key = "super secret key"

app.config['UPLOAD_RESUME'] = 'Resumes'

app.config['UPLOAD_JD'] = 'Job_description'    # JobDescription path


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/jd/upload')
def jd_upload():
    return render_template('jobdescription.html')


@app.route('/jd_uploaded', methods=['POST', 'GET'])
def jd_uploaded():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_JD'], filename))
            return redirect(url_for('index'))
        else:
            return redirect(url_for('try_again'))


@app.route('/try_again')
def try_again():
    return render_template('try_again.html')

@app.route('/resume/<id>')
def open_file(id):
    path = app.config['UPLOAD_RESUME'] + '/' + id
    return send_file(path, attachment_filename=id)

@app.route('/resume/upload')
def upload_files():
    return render_template('resumes.html')


@app.route('/resumes_uploaded', methods=['POST', 'GET'])
def res_uploaded():
    if request.method == 'POST':
        files = request.files.getlist('file')
        for file in files:
            if file:
                filename_jd = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_RESUME'], filename_jd))
        return redirect(url_for('index'))
    else:
        return redirect(url_for('try_again'))


@app.route('/resume/compare' , methods=['GET'])
def compare_to_jds():

    flag = 0
    jd_path = app.config['UPLOAD_JD']
    paths = Path(jd_path).glob('*.txt')
    for path in paths:
        jd_path = path
        flag += 1
        break
    paths = Path(app.config['UPLOAD_RESUME']).glob('*.pdf')
    for path in paths:
        flag += 1
        break
    if flag != 2:
        return "<h1>Please upload both JobDescription and Resumes</h1>"
    else:
        path_id = list()
        my_list = list()
        jd = JobDescription(jd_path)
        id_list = list()
        temp_list = list()
        divide_obj = DividePaths(app.config['UPLOAD_RESUME'])
        for file in divide_obj.path_list:
            resume = Resume(file)
            resume.compare_with(jd)
            id_list.append(resume.id())
            my_list.append(resume.name)
        sort_id = SortId()
        scores = sort_id.sort_scores(id_list, my_list)
        for path in scores:
            a = re.sub(app.config['UPLOAD_RESUME'] + '/', '', path[1][0])
            a = a + '.pdf'
            path_id.append(a)
            print(path)
        for temp in scores:
            print(temp)
            temp_list.append([temp[0], temp[1][1]])

        temp_dict = {'score': temp_list, 'paths': path_id}
        return temp_dict
        #return render_template('id_score.html', result=temp_dict)
@app.route('/resume/getAnalysis')
def getSocialRanking():
    # https: // github.com / fzaninotto
    # https: // www.linkedin.com / in / fzaninotto /
    # https: // github.com / jaredpalmer
    # https: // www.linkedin.com / in / jaredlpalmer /
    #https://in.linkedin.com/in/meghna-lohani-12794414a
    #https://in.linkedin.com/in/aman44

    #df = Engine.getCall("Json/johncscott19.json","https://api.github.com/users/devillarry/repos")
    df1 = Engine.getCall("Json/ashutosh-roy95.json","https://api.github.com/users/devillarry/repos")
    df2 = Engine.getCall("Json/aniket-pawar.json","https://api.github.com/users/jaredpalmer/repos")
    df3 = Engine.getCall("Json/fzaninotto.json","https://api.github.com/users/fzaninotto/repos")
    df2['Id'][0]=2
    df3['Id'][0] = 3
    df2['Name'][0]="Aniket"
    df3['Name'][0]="Fzanion"
    #print(type(df))
    # print(df1.to_dict())
    # print(df2.to_dict())
    # print(df3.to_dict())

    # df1.append(df2)
    # df1.append(df3)
    print(pd.concat([df1,df2,df3]))

    temp_dict = {'1': df1.to_dict(), '2': df2.to_dict(), '3':df3.to_dict()}
    #print(df1.append(df2))
    #return  pd.concat([df1,df2,df3]).to_dict()
    return  temp_dict

# def getProfile(file):
#         model = Word2Vec.load("final.model")
#         text = str(pdfextract(file))
#         text = text.replace("\\n", "")
#         text = text.lower()
#         stats = [nlp(text[0]) for text in model.wv.most_similar("statistics")]
#         NLP = [nlp(text[0]) for text in model.wv.most_similar("language")]
#         ML = [nlp(text[0]) for text in model.wv.most_similar("machine_learning")]
#         DL = [nlp(text[0]) for text in model.wv.most_similar("deep")]
#         # R = [nlp(text) for text in keyword_dictionary['R Language'].dropna(axis = 0)]
#         python = [nlp(text[0]) for text in model.wv.most_similar("python")]
#         Data_Engineering = [nlp(text[0]) for text in model.wv.most_similar("data")]
#         #print("*******************************************")
#         # print(stats_words,NLP_words)
#         matcher = PhraseMatcher(nlp.vocab)
#         matcher.add('Stats', None, *stats)
#         matcher.add('NLP', None, *NLP)
#         matcher.add('ML', None, *ML)
#         matcher.add('DL', None, *DL)
#         matcher.add('Python', None, *python)
#         matcher.add('DE', None, *Data_Engineering)
#
#         doc = nlp(text)
#
#         d = []
#         matches = matcher(doc)
#         for match_id, start, end in matches:
#             rule_id = nlp.vocab.strings[match_id]  # get the unicode I
#             span = doc[start: end]  # get the matched slice of the doc
#             d.append((rule_id, span.text))
#
#         keywords = "\n".join(f'{i[0]} {i[1]} ({j})' for i, j in Counter(d).items())
#         #print("KEYWORDS")
#         #print(keywords)
#
#         ## convertimg string of keywords to dataframe
#         df = pd.read_csv(StringIO(keywords), names=['Keywords_List'])
#         df1 = pd.DataFrame(df.Keywords_List.str.split(' ', 1).tolist(), columns=['Subject', 'Keyword'])
#         df2 = pd.DataFrame(df1.Keyword.str.split('(', 1).tolist(), columns=['Keyword', 'Count'])
#         df3 = pd.concat([df1['Subject'], df2['Keyword'], df2['Count']], axis=1)
#         df3['Count'] = df3['Count'].apply(lambda x: x.rstrip(")"))
#         #print("********************DF********************")
#         #print(df)
#
#         base = os.path.basename(file)
#         filename = os.path.splitext(base)[0]
#
#         name = filename.split('_')
#         #print(name)
#         name2 = name[0]
#         name2 = name2.lower()
#         ## converting str to dataframe
#         name3 = pd.read_csv(StringIO(name2), names=['Candidate Name'])
#
#         dataf = pd.concat([name3['Candidate Name'], df3['Subject'], df3['Keyword'], df3['Count']], axis=1)
#         dataf['Candidate Name'].fillna(dataf['Candidate Name'].iloc[0], inplace=True)
#         #print("******************DATAF**************")
#         print(dataf)
#
#         return (dataf)

# @app.route('/resume/ListOfResume' , methods=['GET'])
# def listOfResume():


app.run()
