from langchain import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

from langchain.llms import OpenAI
from langchain import PromptTemplate

master_prompt = "'''Below is a list of my memories"

def save_mem(memory,old_memories):
    #mem_template = """The following is a record of my memories, I will later ask you a question about them.\n{old_mems}\nmemory: {mem}"""
    mem_template = """{old_mems} \nmemory: {mem}"""
    prompt_template =PromptTemplate(input_variables=["old_mems","mem"],template = mem_template)

    prompt_text = prompt_template.format(mem=memory,old_mems=old_memories)
    #print(prompt_text)
    return prompt_text

def recall_mem(memories,qtn):
  ctrl_prompt = "You are a personal diary with a record of my memories, each memory will have a memory title identified by use_mem_header:, the memory body identified by use_content:'memory_body',tags identified by use_mem_tags:, date tag identified by use_date:'year-month-date' and a time tag identified by use_time in the format hours : minutes: seconds.\nthe use_date and use_time show when the memory was recorded.\nUse the context of the memories to answer the questions.\nEach question may have a tag ref_date:'year-month-date' and tag ref_time:'hours:minutes:seconds' to show when it was asked.Incase i ask about date or time, use ref_date, ref_time, use_date, use_time values for any date and time related calculations."
  query_template = """{master_prompt}:\n{mems}\n\nQuestion: {qtn}\n\nAnswer:"""
  prompt = PromptTemplate(input_variables=["qtn","mems","master_prompt"],template = query_template)
  prompt_txt = prompt.format(qtn=qtn,mems=memories,master_prompt=ctrl_prompt)
  return prompt_txt

def build_mem(memories):
    clear_mems = ''
    old_mems = ''
    for memory in memories:
        print(memory)
        clear_mems = save_mem(memory,old_mems)
        old_mems += clear_mems
        clear_mems = ''
    return old_mems

def total_recall(memories,query):
    all_memories = build_mem(memories)
    made_prompt = recall_mem(all_memories,query)
    return made_prompt

def askMem(prompt):
    try:
        openai = ChatOpenAI(temperature = 1,model_name='gpt-3.5-turbo-1106')
        completion = openai.predict(prompt)
        print(completion)
        prompt_json = {"role":"assistant","content":completion}
        json_data= {"ok": True, "content": completion}
        return json_data
    except Exception as ex:
        print(ex)
        json_error = {"ok": False, "content": "Failed to query model."}
        return json_error