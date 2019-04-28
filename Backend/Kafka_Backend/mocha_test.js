
    it("should message as read once owner opens", function(done) {
        authenticated.post('/ownermshread')
            .send({ "userId": 1, "interest": "Music", "comment": "Life is music" })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.code.should.equals(200);
                done();
            });
    });