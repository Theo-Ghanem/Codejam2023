import json


class GradedItem(object):

    def __init__(self, id, name, type, dueDate, weight, grade, file, assignees, course, timelineItems):
        self.id = id
        self.name = name
        self.type = type
        self.dueDate = dueDate
        self.weight = weight
        self.grade = grade
        self.file = file
        self.assignees = assignees
        self.course = course
        self.timelineItems = timelineItems


    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
