import { expect } from 'chai'

import { getAll, getFrom, filterAnimals, whereLives, report } from './kmom02.js'


describe('Testsuite for kmom02.js', function () {
  describe('getAll', function () {
    it('should be of type Array', function () {
      expect(getAll()).to.be.an('Array')
    })
    it('should contain 29 animals', function () {
      expect(getAll()).to.have.lengthOf(29)
    })
  })

  describe('getFrom', function () {
    it('should be of type Array', function () {
      expect(getFrom('america')).to.be.an('Array')
    })
    it('(america) should include Delta Smelt and contain 9 animals', function () {
      expect(getFrom("america")).to.include("Delta Smelt").with.lengthOf(9)
    })
    it('(africa) should include Pangolin and contain 10 animals', function () {
      expect(getFrom("africa")).to.include("Pangolin").with.lengthOf(10)
    })
    it('(europe) should include Lynx and contain 10 animals', function () {
      expect(getFrom("europe")).to.include("Lynx").with.lengthOf(10)
    })
    it('(asia) should be an empty array', function () {
      expect(getFrom("asia")).to.be.an('Array').with.lengthOf(0)
    })
  })

  describe('filterAnimals', function () {
    it('should be of type Array', function () {
      expect(filterAnimals('kangaroo')).to.be.an('Array')
    })
    it('(ha) should return an array with three animals, including Blue whale', function () {
      expect(filterAnimals('ha')).to.include("Blue whale").with.lengthOf(3)
    })
    it('(ea) should return an array with five animals, including Hooded seal', function () {
      expect(filterAnimals('ea')).to.include("Hooded seal").with.lengthOf(5)
    })
    it('(piglet) should return an empty array', function () {
      expect(filterAnimals('piglet')).to.be.an('Array').with.lengthOf(0)
    })
  })

  describe('whereLives', function () {
    it('should be of type string', function () {
      expect(whereLives('Delta Smelt')).to.be.a('string')
    })
    it('(Monarch butterfly) should be America', function () {
      expect(whereLives('Monarch butterfly')).to.equal('America')
    })
    it('(Crayfish) should be Europe', function () {
      expect(whereLives('Crayfish')).to.equal('Europe')
    })
    it('(Chimpanzee) should be Africa', function () {
      expect(whereLives('Chimpanzee')).to.equal('Africa')
    })
    it('(piglet) should be Unavailable', function () {
      expect(whereLives('piglet')).to.equal('Unavailable')
    })
  })

  describe('report', function () {
    it('should be of type string with 770 or 771 characters, depending on formatting', function () {
      expect(report()).to.be.a('string').with.lengthOf.at.least(770).and.lengthOf.at.most(771)
    })
    it('should contain America: Florida panther (0)', function () {
      expect(report()).to.include('America: Florida panther (0)')
    })
    it('should contain Africa: Ethiopian wolf (0)', function () {
      expect(report()).to.include('Africa: Ethiopian wolf (0)')
    })
    it('should contain Europe: Polar bear (2)', function () {
      expect(report()).to.include('Europe: Polar bear (2)')
    })
  })
})
