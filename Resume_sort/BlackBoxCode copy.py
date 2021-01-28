# -*- coding: utf-8 -*-
"""
Created on Fri Dec 13 19:56:26 2019

@author: roy_as
"""
from gensim.models import Word2Vec
import pandas as pd
import json
import requests
from sklearn import preprocessing


class Engine:
    def calculateLeadershipScore(linkedInList):
        
        train=[['leader','guid','lead','leadership','influence', 'wisdom', 'inspiration', 'passion', 'drive', 'power', 'knowledge','manager',
               'credibility', 'energy', 'foresight', 'sensitivity', 'charisma', 'action', 'perseverance', 'uniting','like','encourage']
               ]
        
        model = Word2Vec(train, min_count=1,size= 50,workers=3, window =3, sg = 1)
        LeadershipSocre=0
        count=0
        for str1 in linkedInList:
          count=count+1
          print(str1)
          input1=str1.split(' ')
          result=0
          result=model.predict_output_word(input1, topn=10)   
          print(result)
          score=0
          if(result is None):
            count=count-1
            continue
          for i in result:
              score=score+i[1]
    
          score=score/10
          LeadershipSocre=LeadershipSocre+score
        if count is not 0:
            LeadershipSocre=LeadershipSocre/count
        print("final score",LeadershipSocre)
        return LeadershipSocre
    
    def RolesAndResponsibility(experienceList):
        
      list1=['Software Trainee','Software Associate','Software Analyst','Software Engineer','Senior Software Analyst','Software Quality Engineer'
             ,'System Administrator','Senior Process Analyst','Software Test Engineer','Software Project Manager','Software Application Engineer','Senior Software QA Engineer'
             ,'Senior Software Developer','Senior Software Engineer','Senior Software Programmer','Lead Software Project Engineer','Senior Project Manager','Project Head','Chief Technical Officer']
      score=0
      for string1 in experienceList:
        res = [ele for ele in list1 if(ele in string1)]
        print(res)
        #print(list1.index(res[len(res)-1]))
        if len(res)>0:
          score=score+list1.index(res[len(res)-1])
        if len(res)==1:
          score=score+list1.index(res[0])
      print("Roles&Resposib",score)
      return score
      
    def countSkills(listOfSkills):
       
       return len(listOfSkills)
    
    def countTech(listOfTech):
       
       return len(listOfTech)
    
    



    def scoreCalculator(listOfResumes):
    
      df={'Id':[],'Name':[],'SkillCount':[],'TechCount':[],'Leadership':[],'Roles&Responsibility':[],'FinalScore':[]}
      df=pd.DataFrame(df)
      #print(listOfResumes)
      #print("##############33")
      l1=listOfResumes
      print("#######")
      print(l1)
      print("#####")
      df['Id']=l1['Id']
      df['Name']=l1['Name']
      df['SkillCount']=len(l1['skills'])
      df['TechCount']=len(l1['Languages'])
        #df['Experience'][0]=l1['experience_Count']
      df['Leadership']= Engine.calculateLeadershipScore(l1['description'])
      df['Roles&Responsibility']=Engine.calculateLeadershipScore(l1['experience'])
      print("Hiii",df['Roles&Responsibility'])
      #normailse scores
      # Create a minimum and maximum processor object
      min_max_scaler=preprocessing.MinMaxScaler()
      #x = df[['SkillCount']].values.astype(float)
      # Create an object to transform the data to fit minmax processor
      #df['SkillsCount'] = min_max_scaler.fit_transform(x)
      #df['TechCount']= min_max_scaler.fit_transform(df[['TechCount']].values.astype(float))
      df['Roles&Responsibility']= min_max_scaler.fit_transform(df[['Roles&Responsibility']].values.astype(float))
      #df['Experience']= min_max_scaler.fit_transform(df[['Experience']].values.astype(float))
      
      
      df['FinalScore']=df['SkillCount']+df['TechCount']+df['Leadership']+df['Roles&Responsibility']
      return  df


    def getCall(self,linkedJsonFileName,url):
        dumpyLeadershipList = ['discourage the  team work', 'i lead the team',
                               'innovation distinguishes between a leader and a follower.',
                               'leadership and learning are indispensable to each other']
        # LeadershipSocre = Engine.calculateLeadershipScore(dumpyLeadershipList)
        d2 = ['worked as Senior Software Engineer', 'Software Associate']
        # Engine.RolesAndResponsibility(d2)
        linkedJsonFileName = 'johncscott19.json'
        with open(linkedJsonFileName) as json_file:
            data = json.load(json_file)
        listskills = []
        for i in range(len(data['skills'])):
            listskills.append(data['skills'][i]['title'])
        # print(list1)
        listDesp = []
        for j in range(len(data['positions'])):
            # print(data['positions'][j]['description'])
            # print(data['positions'][j])
            if 'description' not in data['positions'][j]:
                continue
            listDesp.append(data['positions'][j]['description'])
        # print(listDesp)
        listExp = []
        for j in range(len(data['positions'])):
            if 'title' not in data['positions'][j]:
                continue
            listExp.append(data['positions'][j]['title'])
        print(listExp)

        url = 'https://api.github.com/users/devillarry/repos'
        response = requests.get(url)
        dataGit = response.json()
        listLanguage = []
        for list1 in dataGit:
            listLanguage.append(list1['language'])
        print(listLanguage)

        rs = {'Id': ['1'], 'Name': ['ram'], 'skills': listskills, 'Languages': listLanguage, 'description': listDesp,
              'experience': listExp}
        return  Engine.scoreCalculator(rs)

if __name__ == '__main__'():
    Engine.getCall("johncscott19.json","https://api.github.com/users/devillarry/repos")


    
