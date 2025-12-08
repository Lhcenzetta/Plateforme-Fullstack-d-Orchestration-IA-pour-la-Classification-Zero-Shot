from services.analyzer import query

def test_hybrid_analyse_mock(mocker):

    fake = mocker.Mock()

    fake.status_code = 200
    fake.json.return_value = [{
        "label": "technology",
        "score": 0.95
    }]

    mocker.patch('backend.app.services.analyzer.requests.post', return_value=fake)

    text = "The new smartphone model has advanced features and a sleek design."
    result = query(text)
    assert result["category"] == "technology"
    assert result["confidence"] == 0.95

from services.analyzer import hybrid_analyse
def test_hybrid_analyse_integration():
    text = "The new smartphone model has advanced features and a sleek design."
    result_text, confidence, category, resume, tone = hybrid_analyse(text)

    assert isinstance(result_text, str)
    assert isinstance(confidence, float)
    assert isinstance(category, str)
    assert isinstance(resume, str)
    assert isinstance(tone, str)